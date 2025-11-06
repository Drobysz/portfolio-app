'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import projects from "@/data_json/project_intro_info.json";

export interface ProjectProps {
    title:       string;
    description: string;
    img:         string;
    pagename:    string;
};

interface ProjectsContextProps {
    project:      ProjectProps;
    currentIndex: number;
    setHover:     Dispatch<SetStateAction<boolean>>;
    setIndex:     Dispatch<SetStateAction<number>>;
};

export const ProjectsContext = createContext<ProjectsContextProps>({
    project: {
        title:       projects[0].title,
        description: projects[0].description,
        img:         projects[0].img,
        pagename:    projects[0].pagename,
    },
    currentIndex: 0,

    setHover: ()=> {},
    setIndex: ()=> {}
});

export const ProjectsContextProvider = ({children}: {children: ReactNode})=> {
    const [ currentIndex, setIndex ] = useState(0);
    const [ isHovered, setHover ] = useState(false);
    const project = projects[currentIndex];
    const interval = isHovered ? 1000000 : 7000;

    useEffect(()=> {
        const projectInterval = setInterval(()=> {
            setIndex( i=> (i + 1) % projects.length );

        }, interval);
        return ()=> clearInterval(projectInterval);
    }, [interval]);

    return (
        <ProjectsContext.Provider
            value={{
                project:      project,
                currentIndex: currentIndex,
                setHover,
                setIndex,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};