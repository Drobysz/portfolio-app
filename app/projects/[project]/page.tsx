import projects from "@/data_json/project_intro_info.json";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectPage } from "./content/ProjectPage"; 
import { FullScreenSpin } from "@/components/index";

export async function generateStaticparams() {
    return projects.map(p=> ({ 
        project: p.pagename 
    }));   
};

export async function generateMetadata({ params }: { params: Promise<{ project: string; }> }): Promise<Metadata> {
    const { project } = await params;
    console.log(project);
    const projectData = projects.find( p=> p.pagename === project );
    return {
        title: projectData?.title,
        description: projectData?.description,
        openGraph: {
            title: projectData?.title,
            description: projectData?.description,
            images: [
                {
                    url: `/project_images/${projectData?.img}.png`,
                    width: 1200,
                    height: 630,
                    alt: projectData?.img,
                },
            ]
        }
    };
};

export default async function Page ({ params }: { params: Promise<{ project: string; }>  }) {    
    const { project } = await params;

    return (
        <Suspense fallback={<FullScreenSpin />}>
            <ProjectPage pagename={project} />
        </Suspense>
    );
};