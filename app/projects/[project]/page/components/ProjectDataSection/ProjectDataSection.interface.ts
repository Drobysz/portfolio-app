export interface ProjectDataProps {
    title: string;
    description: string;
    stacks: StackObj;
    pagename: string;
    GH_link: string;
    site_link: string;
    date: string;
};

interface StackObj {
    frontend: string[];
    backend: string[];
    devops: string[];
};

export interface ProjectDataObj {
    projectData: ProjectDataProps;
};