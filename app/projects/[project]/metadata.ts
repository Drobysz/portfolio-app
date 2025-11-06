import { Metadata } from "next";
import projects from "@/data_json/project_intro_info.json";

export async function generateProjectMetaData(project: string): Promise<Metadata> {
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