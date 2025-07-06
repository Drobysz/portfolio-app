import projects from "@/data_json/project_intro_info.json";

import { ProjectDataObj, ProjectDataProps } from "./ProjectDataSection.interface";
import { CustomBtn, LinkImageBtn, GlowingEffect } from "@/components/index";

import { avenir, tronecal } from "@/fonts/fonts";
import cn from "classnames";

export const ProjectDataSection = ({ projectData }: ProjectDataObj)=> {
    const img = projects.find( p=> p.pagename === projectData.pagename )!.img;

    return (
        <section className="flex flex-col w-[50%] items-center justify-center mx-auto gap-10 content-center mb-20">
            <h2
                className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-6xl font-extrabold max-[1216px]:text-5xl max-[991px]:text-4xl max-[778px]:text-3xl max-[658px]:text-2xl"
            >
                {projectData.date}
            </h2>
            <p className={cn("text-2xl text-white/70 max-[991px]:text-xl max-[778px]:text-lg max-[658px]:text-sm max-[540px]:text-xs", avenir.className)}>
                {projectData.description}
            </p>
            <div className="flex flex-col gap-6 w-full">
                <Stack projectData={projectData}/>
                <LinkBtns 
                    projectData={projectData}
                    img={img}
                />
            </div>
        </section>
    );
};

const Stack = ({ projectData }: ProjectDataObj)=> {
    const stacks = [ 
        "Front-end", 
        "Back-end", 
        "Devops", 
    ];

    return (
        <GlowingEffect
            disabled={false}
            spread={80} 
            glow
            className="col-span-2 flex flex-col place-content-center gap-4 p-8 backdrop-blur-xl rounded-xl border-2 bg-zinc-900/40 border-zinc-700 perspective-distant max-[650px]:gap-5">
            {Object.entries(projectData.stacks).map( ( [category, list], idx )=> (
                <div 
                    className="flex gap-3 max-[650px]:flex-col"
                    key={`id-${category}`}
                >
                    <h3 className={cn(`w-fit text-white/70 font-bold text-xl max-[650px]:text-lg max-[520px]:text-sm`, tronecal.className)}>
                        {stacks[idx]}
                    </h3>
                    <p className="flex flex-wrap gap-1.5">
                        {list.map( (stack: string, idx: number)=> (
                            <span 
                                className="text-white/40 text-lg font-extrabold italic max-[650px]:text-sm max-[520px]:text-xs" 
                                key={`id-${idx}`}
                            >
                                {stack}{idx+1 === list.length ? "." : ","}
                            </span>
                        ) )}
                    </p>
                </div>
            ))}
        </GlowingEffect>
    );
};

const LinkBtns = ({ 
    projectData,
    img
}: {
    projectData: ProjectDataProps,
    img: string,
})=> {
    return (
        <div className="h-full grid grid-cols-2 gap-4">
            <LinkImageBtn 
                img={`/GH_links/${img}.png`}
            >
                <CustomBtn 
                    className="w-full h-full"
                    size="medium"
                    color="white"
                    link={projectData.GH_link}
                > 
                    GitHub
                </CustomBtn>
            </LinkImageBtn>
            <LinkImageBtn
                img={`/project_images/${img}.png`}
            >
                <CustomBtn 
                    className="w-full"
                    size="medium"
                    color="ghost"
                    link={projectData.site_link}
                > 
                    site
                </CustomBtn>
            </LinkImageBtn>
        </div>
    );
};
