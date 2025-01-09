import { useState } from "react"
    import { useComponentRegistry } from "@/components/ui/component-registry"
    import { DndProvider } from "react-dnd"
    import { HTML5Backend } from "react-dnd-html5-backend"
    import { ComponentConfig } from "@/lib/utils"

    export function Builder() {
      const [components, setComponents] = useState<ComponentConfig[]>([])
      const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
      const registry = useComponentRegistry()

      const handleMove = (from: string, to: string) => {
        setComponents((prev) => {
          const fromIndex = prev.findIndex((c) => c.id === from)
          const toIndex = prev.findIndex((c) => c.id === to)
          const newComponents = [...prev]
          const [moved] = newComponents.splice(fromIndex, 1)
          newComponents.splice(toIndex, 0, moved)
          return newComponents
        })
      }

      const addComponent = (type: string) => {
        const component = registry[type]
        if (!component) return

        const newComponent: ComponentConfig = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          props: { ...component.defaultProps },
        }

        setComponents((prev) => [...prev, newComponent])
      }

      const updateComponent = (id: string, config: ComponentConfig) => {
        setComponents((prev) =>
          prev.map((c) => (c.id === id ? config : c))
        )
      }

      return (
        <DndProvider backend={HTML5Backend}>
          <div className="flex h-screen">
            <div className="w-1/4 bg-gray-100 p-4">
              <h2 className="text-lg font-bold mb-4">Components</h2>
              <div className="space-y-2">
                {Object.values(registry).map((component) => (
                  <button
                    key={component.type}
                    onClick={() => addComponent(component.type)}
                    className="w-full p-2 bg-white border rounded hover:bg-gray-50"
                  >
                    {component.displayName}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                {components.map((config) => {
                  const component = registry[config.type]
                  if (!component) return null

                  return (
                    <div key={config.id}>
                      {component.render({
                        ...config.props,
                        id: config.id,
                        onMove: handleMove
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="w-1/4 bg-gray-100 p-4">
              <h2 className="text-lg font-bold mb-4">Properties</h2>
              {selectedComponent && (
                <div>
                  {(() => {
                    const config = components.find(
                      (c) => c.id === selectedComponent
                    )
                    if (!config) return null
                    const component = registry[config.type]
                    if (!component?.editor) return null

                    return component.editor({
                      config,
                      onChange: (newConfig) =>
                        updateComponent(selectedComponent, newConfig),
                    })
                  })()}
                </div>
              )}
            </div>
          </div>
        </DndProvider>
      )
    }

    export default Builder
