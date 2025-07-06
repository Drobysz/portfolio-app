import { BackgroundLines } from "@/components/index";
import { RotatingIcon } from "./RotatingIcon/RotatingIcon";
import { ProjectDataSection } from "./ProjectDataSection/ProjectDataSection";

import projectPages from "@/data_json/project_pages.json";
import projects from "@/data_json/project_intro_info.json"

import { notFound } from "next/navigation";

export const ProjectPage = ({ pagename }: { pagename: string })=> {
    const projectPage = projectPages.find( p=> p.pagename === pagename )
    const project = projects.find(p => p.pagename === pagename)

    if (!projectPage) {
        return notFound();  
    };

    return (
        <>
            {/* background */}
            <BackgroundLines className="-z-10" />
            <RotatingIcon img={project!.img} title={projectPage!.title}/>
            <ProjectDataSection projectData={projectPage}/>
        </>
    );
};