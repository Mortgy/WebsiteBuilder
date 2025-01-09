import { createContext, useContext } from "react"
    import { ComponentDefinition } from "@/lib/utils"

    const components = {}

    const ComponentRegistryContext = createContext(components)

    export function ComponentRegistryProvider({ children }) {
      return (
        <ComponentRegistryContext.Provider value={components}>
          {children}
        </ComponentRegistryContext.Provider>
      )
    }

    export function useComponentRegistry() {
      return useContext(ComponentRegistryContext)
    }
