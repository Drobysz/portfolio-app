"use client";

import { FullScreenSpin } from "@/components";
import { BackgroundLines } from "@/components/animations/BackgroundLines";
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
