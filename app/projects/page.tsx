import { ProjectsContextProvider } from "@/app/projects/context/projects.context";
import { BackgroundLines }  from "@/components/index";
import { ProjectIntro, ProjectsSection } from "./page/index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Here you can get acquainted with projects of beginning developer Alexander Drobysz",
};

export default function ProjectPage (){
    return (
        <ProjectsContextProvider>
            <ProjectIntro />
            <ProjectsSection />
            <BackgroundLines className="-z-10"/>
        </ProjectsContextProvider>
    );
};