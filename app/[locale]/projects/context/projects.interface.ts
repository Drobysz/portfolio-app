import { Project } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

export interface ProjectsContextProps {
    projects?:          Project[];
    areProjectsLoading: boolean;
    projectsError?:     Error;
    currentIndex:       number;

    setHover:        Dispatch<SetStateAction<boolean>>;
    setIndex:        Dispatch<SetStateAction<number>>;
    mutateProjects:  KeyedMutator<Project[]>;
};