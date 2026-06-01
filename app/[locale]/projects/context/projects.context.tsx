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

    setIndex: ()=> {},
    mutateProjects: async () => undefined,
});

export const ProjectsContextProvider = ({children}: {children: ReactNode})=> {
    const [ currentIndex, setIndex ] = useState(0);
    const interval = 15000;

    const { setNotification } = useContext(AppContext);

    const {
		data: projects = [],
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

    useEffect(()=> {
        if (!projects) return;

        const projectInterval = setInterval(()=> {
            setIndex( i=> (i + 1) % projects.length );

        }, interval);

        return ()=> clearInterval(projectInterval);
    }, [projects.length]);

    useEffect(()=> {
        if (!projectsError) return;

        setNotification({
            status: "error",
            text: "Failed to load projects"
        });
    }, [projectsError, setNotification]);

    return (
        <ProjectsContext.Provider
            value={{
                projects:     projects,
                currentIndex: currentIndex,
                projectsError,
                areProjectsLoading,

                setIndex,
                mutateProjects
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};