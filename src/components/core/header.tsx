import { ComponentDefinition } from "@/lib/utils"
    import { DndContainer } from "@/components/ui/dnd-container"

    export const Header: ComponentDefinition = {
      type: "header",
      displayName: "Header",
      defaultProps: {
        title: "My Website",
        description: "Welcome to my website",
      },
      render: ({ title, description, id, onMove }) => (
        <DndContainer id={id} onMove={onMove}>
          <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-gray-400">{description}</p>
            </div>
          </header>
        </DndContainer>
      ),
      editor: ({ config, onChange }) => (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={config.props.title as string}
              onChange={(e) =>
                onChange({
                  ...config,
                  props: { ...config.props, title: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={config.props.description as string}
              onChange={(e) =>
                onChange({
                  ...config,
                  props: { ...config.props, description: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      ),
    }
