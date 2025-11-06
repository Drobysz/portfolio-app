import projects from "@/data_json/project_intro_info.json";
import { Suspense } from "react";
import { ProjectPage } from "./page/ProjectPage"; 
import { FullScreenSpin } from "@/components/index";
import { generateProjectMetaData } from "./metadata";
import { Metadata } from "next";

export async function generateStaticParams() {
    return projects.map(p=> ({ 
        project: p.pagename 
    }));   
};

export async function generateMetadata({
    params
}:
{ 
    params: { project: string } 
}): Promise<Metadata> {
    const { project } = await(params)
    return generateProjectMetaData(project);
}

export default async function Page ({ params }: { params: Promise<{ project: string; }>  }) {    
    const { project } = await params;

    return (
        <Suspense fallback={<FullScreenSpin />}>
            <ProjectPage pagename={project} />
        </Suspense>
    );
};