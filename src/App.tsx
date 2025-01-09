import { ComponentRegistryProvider } from "@/components/ui/component-registry"
    import { Header } from "@/components/core/header"
    import { ContentSection } from "@/components/core/content-section"
    import { Footer } from "@/components/core/footer"
    import Builder from "@/components/builder/builder"

    const components = {
      header: Header,
      "content-section": ContentSection,
      footer: Footer,
    }

    export default function App() {
      return (
        <ComponentRegistryProvider components={components}>
          <Builder />
        </ComponentRegistryProvider>
      )
    }
