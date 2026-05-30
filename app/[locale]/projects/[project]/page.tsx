import { Suspense } from "react";
import { ProjectPage } from "./ProjectPage/ProjectPage";
import { FullScreenSpin } from "@/components/index";
import { Metadata } from "next";
import { fetchProjectsFromApi } from "@/queries/fetchProjects";

export async function generateStaticParams() {
    try {
        const projects = await fetchProjectsFromApi();

        return projects.map(p=> ({
            project: p.slug
        }));
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.warn(`Failed to fetch project params from API during build: ${message}`);
        return [];
    }
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
