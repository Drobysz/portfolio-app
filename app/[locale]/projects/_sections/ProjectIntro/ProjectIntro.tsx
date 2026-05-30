'use client'

import cn from "classnames";

import { 
    Shadow,
    ProjectImage,
    ProjectIntroInfo
} from "./_components/index";
import { useContext } from "react";
import { ProjectsContext } from "../../context/projects.context";
import { FullScreenSpin } from "@/components";

export const ProjectIntro = ()=> {
    const {
        currentIndex,
        projects,
        areProjectsLoading,
        projectsError
    } = useContext(ProjectsContext);

    if (!projects) {
        return <FullScreenSpin />
    }

    const currentProject = projects!.find((_, i)=> i == currentIndex);

    return (
        <>
            { !projectsError && !areProjectsLoading && projects && 
                <section className={cn(
                    "relative pt-8",
                    "h-[55vh] flex items-center"
                )}>
                    <ProjectIntroInfo 
                        project={currentProject!}
                    />
                    <Shadow />
                    <ProjectImage 
                        project={currentProject!}
                    />
                </section>
            }
            {areProjectsLoading && <FullScreenSpin />}
        </>
    );
};