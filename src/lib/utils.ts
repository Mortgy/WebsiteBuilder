import { type ClassValue, clsx } from "clsx"
    import { twMerge } from "tailwind-merge"

    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs))
    }

    export interface ComponentConfig {
      id: string
      type: string
      props: Record<string, unknown>
    }

    export interface ComponentDefinition {
      type: string
      displayName: string
      defaultProps: Record<string, unknown>
      render: (props: any) => JSX.Element
      editor?: (props: {
        config: ComponentConfig
        onChange: (config: ComponentConfig) => void
      }) => JSX.Element
    }
