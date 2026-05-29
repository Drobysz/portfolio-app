import { Suspense } from "react";
import { ProjectPage } from "./ProjectPage/ProjectPage";
import { FullScreenSpin } from "@/components/index";
import { Metadata } from "next";
import { fetchProjects } from "@/queries/fetchProjects";
import { Project } from "@/interfaces";

export async function generateStaticParams() {
    const projects: Project[] = await fetchProjects();

    return projects.map(p=> ({ 
        project: p.slug
    }));   
};

export async function generateMetadata({
    params
}:
{ 
    params: { project: string } 
}): Promise<Metadata> {
    const { project } = await(params)
    return {
        title: project
    };
}

export default async function Page ({ params }: { params: Promise<{ project: string; }>  }) {    
    const { project } = await params;

    return (
        <Suspense fallback={<FullScreenSpin />}>
            <ProjectPage slug={project} />
        </Suspense>
    );
};