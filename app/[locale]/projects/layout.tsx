import { ProjectsContextProvider } from "./context/projects.context";

export default function ProjectLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ProjectsContextProvider>
            {children}
        </ProjectsContextProvider>
    )
}