'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProjectsContextProps } from "./projects.interface";
import { fetchProjects } from "@/queries/fetchProjects";
import useSWR from "swr";
import { AppContext } from "../../context/app.context";

export const ProjectsContext = createContext<ProjectsContextProps>({
    projects: [],
    currentIndex: 0,
    areProjectsLoading: false,

    setHover: ()=> {},
    setIndex: ()=> {},
    mutateProjects: async () => undefined,
});

export const ProjectsContextProvider = ({children}: {children: ReactNode})=> {
    const [ currentIndex, setIndex ] = useState(0);
    const [ isHovered, setHover ] = useState(false);
    const interval = isHovered ? 1000000 : 7000;

    const { setNotification } = useContext(AppContext);

    const {
		data: projects,
		error: projectsError,
		isLoading: areProjectsLoading,
		mutate: mutateProjects
	} = useSWR(
		"global-projects",
		fetchProjects,
		{
			refreshInterval: 10 * 60 * 1000,
			dedupingInterval: 10 * 60 * 1000,
            shouldRetryOnError: (error) => error?.status !== 401,
		}
	);

    console.log(projects)

    useEffect(()=> {
        if (!projects) return;

        const projectInterval = setInterval(()=> {
            setIndex( i=> (i + 1) % projects.length );

        }, interval);
        return ()=> clearInterval(projectInterval);
    }, [interval]);

    useEffect(()=> {
        if (projectsError === undefined) return;

        setNotification({
            status: "error",
            text: "Failed to load projects"
        });
     }, [projectsError, setNotification]);

    return (
        <ProjectsContext.Provider
            value={{
                projects:      projects,
                currentIndex: currentIndex,
                projectsError,
                areProjectsLoading,

                setHover,
                setIndex,
                mutateProjects
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};