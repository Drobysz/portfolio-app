'use client'

import { ProjectsContext, ProjectProps } from "@/app/projects/context/projects.context";
import { useContext, useLayoutEffect, useState, useRef } from "react";
import { impact } from "@/fonts/fonts";
import cn from "classnames";
import projects from "@/data_json/project_intro_info.json";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ProjectPanelProps {
    currentProject: ProjectProps;
    index: number;
    setPosition: ( PosProps : CursorProps )=> void;
};

interface CursorProps {
    left: number,
    top: number,
    width: number,
    height: number,
};

interface CursorPosition {
    position: CursorProps
};

export const ProjectsSection = ()=> {
    const [position, setPosition] = useState<CursorProps>({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
    });

    return (
        <section className="relative grid grid-cols-[repeat(auto-fit,minmax(150px,200px))] justify-center gap-6 p-5 mb-30">
            { projects.map( (p, index)=> (
                <ProjectPanel 
                    key={p.pagename} 
                    currentProject={p} 
                    index={index}
                    setPosition={setPosition}
                /> 
            ) ) }
            <Cursor position={position}/>
        </section>
    );
};

const ProjectPanel = ({ currentProject, index, setPosition }: ProjectPanelProps)=> {
    const { setIndex, setHover, currentIndex } = useContext(ProjectsContext);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Background Variables
    const background = 
        currentIndex !== index 
        ?
            {
                backgroundImage:    `url(/project_covers/${currentProject.img}.png)`,
                backgroundSize:     "cover",
                backgroundPosition: "center",
            }
        :
            { backgroundColor: "#262626" }

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            if (index === currentIndex)
                setPosition({
                    left:   el.offsetLeft,
                    top:    el.offsetTop,
                    width:  el.offsetWidth,
                    height: el.offsetHeight,
                });
        };

        if (index === currentIndex) update();

        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, [currentIndex, index, setPosition]);

    const handleInteraction = (action: true | false | "clicked")=> {
        switch (action) {
            case true:
                setHover(true);
                setIndex(index)    
                break;

            case false:
                setHover(false);
                break;

            case "clicked":
                router.push(`/projects/${currentProject.pagename}`)    
                break;
        }
    }; 

    return (
        <div
            ref={ref}
            className="group relative cursor-pointer w-full place-content-center border-4 border-neutral-600 h-[100px] overflow-hidden rounded-3xl"
            onMouseEnter={()=> handleInteraction(true)}
            onMouseLeave={()=> handleInteraction(false)}
            onClick={()=> handleInteraction("clicked")}
        >
            <div 
                className="absolute inset-0 z-10 hover:scale-110 duration-300 transition-all"
                style={background}
            />
            { currentIndex === index && (
                <h3 className={cn("relative text-xl text-center z-50 text-white px-3 py-0.5 rounded-lg transition-all duration-300", impact.className)}>
                    {currentProject.title}
                </h3>
            )}
        </div>
    );
};

const Cursor = ({ position }: CursorPosition)=> {
    return (
        <motion.div 
            className="absolute bg-white rounded-3xl p-2" 
            animate={{
                ...position
            }}
        />
    );
};