import { ComponentDefinition } from "@/lib/utils"
    import { DndContainer } from "@/components/ui/dnd-container"

    export const ContentSection: ComponentDefinition = {
      type: "content-section",
      displayName: "Content Section",
      defaultProps: {
        title: "Section Title",
        content: "This is a content section",
      },
      render: ({ title, content, id, onMove }) => (
        <DndContainer id={id} onMove={onMove}>
          <section className="py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p>{content}</p>
            </div>
          </section>
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
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={config.props.content as string}
              onChange={(e) =>
                onChange({
                  ...config,
                  props: { ...config.props, content: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      ),
    }
