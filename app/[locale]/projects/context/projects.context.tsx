'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProjectsContextProps } from "./projects.interface";
import { fetchProjects } from "@/queries/fetchProjects";
import useSWR from "swr";
import { AppContext } from "../../context/app.context";
import { Project } from "@/interfaces";

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

    console.log(projects)
    const repeatedProjects = Array(5).fill(projects).flat();

    useEffect(()=> {
        if (!repeatedProjects) return;

        const projectInterval = setInterval(()=> {
            setIndex( i=> (i + 1) % repeatedProjects.length );

        }, interval);

        console.log(currentIndex)
        return ()=> clearInterval(projectInterval);
    }, [interval, repeatedProjects.length]);

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
                projects:     repeatedProjects,
                // projects: projects,
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