"use client";

import { BackgroundLines, FullScreenSpin } from "@/components";
import { RotatingIcon, ProjectDataSection } from "./_sections";

import { notFound } from "next/navigation";
import { useContext } from "react";
import { ProjectsContext } from "../../context/projects.context";

export const ProjectPage = ({ slug }: { slug: string })=> {
    const { 
        areProjectsLoading,
        projectsError,
        projects
    } = useContext(ProjectsContext);

    if (!projects) {
        return notFound();  
    };

    const project = projects.find(p => p.slug === slug);
    console.log(projects)

    return (
        <>
            {project && !areProjectsLoading && !projectsError &&
                <>
                    <BackgroundLines className="-z-10" />
                    <RotatingIcon
                        img={project.project_image_url ?? ""}
                        title={project.title}
                    />
                    <ProjectDataSection project={project}/>
                </>
            }
            {areProjectsLoading && <FullScreenSpin />}
        </>
    );
};