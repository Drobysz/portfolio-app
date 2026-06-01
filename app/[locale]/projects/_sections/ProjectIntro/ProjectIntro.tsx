'use client'

import { 
    Shadow,
    ProjectImage,
    ProjectIntroInfo
} from "./_components/index";
import { useContext } from "react";
import { ProjectsContext } from "../../context/projects.context";
import { FullScreenSpin } from "@/components";
import s from "./style.module.scss";

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
            {!projectsError && !areProjectsLoading && projects && 
                <section className={s.body}>
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