import { ProjectsContextProvider } from "@/app/projects/context/Projects.context";
import { ProjectIntro, ProjectsSection }  from "@/components/index";

export default function ProjectPage (){
    return (
        <ProjectsContextProvider>
            <ProjectIntro />
            <ProjectsSection />
        </ProjectsContextProvider>
    );
};