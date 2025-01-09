import { ComponentDefinition } from "@/lib/utils"
    import { DndContainer } from "@/components/ui/dnd-container"

    export const Footer: ComponentDefinition = {
      type: "footer",
      displayName: "Footer",
      defaultProps: {
        text: "© 2023 My Website. All rights reserved.",
      },
      render: ({ text, id, onMove }) => (
        <DndContainer id={id} onMove={onMove}>
          <footer className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4 text-center">
              <p>{text}</p>
            </div>
          </footer>
        </DndContainer>
      ),
      editor: ({ config, onChange }) => (
        <div>
          <label className="block text-sm font-medium mb-1">Footer Text</label>
          <input
            type="text"
            value={config.props.text as string}
            onChange={(e) =>
              onChange({
                ...config,
                props: { ...config.props, text: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
      ),
    }
