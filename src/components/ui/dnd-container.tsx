import { useDrag, useDrop } from "react-dnd"
    import { HTMLAttributes, forwardRef } from "react"
    import { cn } from "@/lib/utils"

    interface DndContainerProps extends HTMLAttributes<HTMLDivElement> {
      id: string
      onMove: (from: string, to: string) => void
    }

    export const DndContainer = forwardRef<HTMLDivElement, DndContainerProps>(
      ({ id, onMove, className, children, ...props }, ref) => {
        const [{ isDragging }, drag] = useDrag(() => ({
          type: "COMPONENT",
          item: { id },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
        }))

        const [, drop] = useDrop(() => ({
          accept: "COMPONENT",
          drop: (item: { id: string }) => {
            if (item.id !== id) {
              onMove(item.id, id)
            }
          },
        }))

        return (
          <div
            ref={(node) => drag(drop(node))}
            className={cn(
              "relative border border-dashed border-transparent hover:border-gray-300 rounded-lg p-2 transition-all",
              isDragging && "opacity-50",
              className
            )}
            {...props}
          >
            {children}
          </div>
        )
      }
    )
    DndContainer.displayName = "DndContainer"
