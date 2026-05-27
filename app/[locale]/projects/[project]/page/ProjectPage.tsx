import { BackgroundLines } from "@/components/index";
import { RotatingIcon, ProjectDataSection } from "./components/index";

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
            <BackgroundLines className="-z-10" />
            <RotatingIcon
                img={project!.img}
                title={projectPage!.title}
            />
            <ProjectDataSection projectData={projectPage}/>
        </>
    );
};