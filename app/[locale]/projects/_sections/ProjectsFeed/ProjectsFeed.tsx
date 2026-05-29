'use client'

import { useContext, useState } from "react";
import s from "./style.module.scss";
import { CursorProps } from "./types";
import { 
    Cursor,
    ProjectPanel,
    Loading
} from "./_components";
import { ProjectsContext } from "../../context/projects.context";


export const ProjectsFeed = ()=> {
    const {
        projects,
        areProjectsLoading,
        projectsError
    } = useContext(ProjectsContext);

    const [position, setPosition] = useState<CursorProps>({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
    });

    return (
        <section className={s.feed_layout}>
            { !projectsError && !areProjectsLoading && projects 
                && projects.map( (p, index)=> (
                <ProjectPanel
                    key={p.slug} 
                    currentProject={p} 
                    index={index}
                    setPosition={setPosition}
                /> 
            ))}
            {areProjectsLoading && <Loading />}
            <Cursor position={position}/>
        </section>
    );
};