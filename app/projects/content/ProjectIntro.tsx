'use client'

import { useContext } from "react";
import { CustomBtn } from "@/components/index";
import { ProjectsContext } from "@/app/projects/context/Projects.context";
import { bagel_fat_one, avenir } from "@/fonts/fonts";
import { AnimatePresence, motion, Transition } from "framer-motion";
import cn from "classnames";

export const ProjectIntro = ()=> {
    const { project } = useContext(ProjectsContext);
    const { title, description, pagename, img } = project;

    return (
        <section className="relative pt-8 mb-15 h-[55vh] flex items-center">
            {/* Text Content */}
            <AnimatePresence initial={false} mode="wait">
                { project && ( 
                    <motion.div 
                        key={project.pagename}
                        className="flex flex-col w-[35vw] z-30 gap-8 max-[560px]:gap-4"
                        variants={variantsTextContent}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className={cn("text-white text-5xl font-bold max-[860px]:text-3xl max-[560px]:text-xl", bagel_fat_one.className)}>
                            {title}
                        </h2>
                        <p className={cn("text-transparent font-extralight bg-gradient-to-br from-white to-gray-400 bg-clip-text max-[860px]:text-sm max-[560px]:text-xs", avenir.className)}>
                            {description}
                        </p>
                        <CustomBtn
                            color="white"
                            link={`/projects/${pagename}`}
                        >
                            Learn more
                        </CustomBtn>
                    </motion.div> 
                )}
            </AnimatePresence>

            {/* Background Content */}
            {/* SHADOW */}
            <div 
                className="absolute z-20 left-0 w-[75%] h-full" 
                style={{
                    background: 'linear-gradient( to left, transparent, #0A0A0A 40%)',
                }}  
            />
            {/* IMAGE */}
            <AnimatePresence>
                <motion.div 
                    key={project.pagename}
                    className="absolute right-0 h-full w-[55%] rounded-md max-[1032px]:h-[80%] max-[800px]:h-[50%]"
                    style={{
                        backgroundImage: `url(/project_images/${img}.png)`,
                        backgroundSize: "cover",
                    }}
                    variants={variantsBackgroundContent}
                    initial="hidden"
                    animate="visible"
                />
            </AnimatePresence>
        </section>
    );
};

// Text Animation
const transitionTextContent: Transition = { type: "spring", stiffness: 300, damping: 50, duration: 0.5, ease: "easeInOut" };
const variantsTextContent = {
    hidden:  { x: 0, y: 20, opacity: 0 },
    visible: { x: 0, y:  0, opacity: 1, transition: transitionTextContent },
    exit:    { x: 0, y:  5, opacity: 0, transition: transitionTextContent },
};

// Background Animation
const transitionBackgroundContent: Transition  = { duration: 2, ease: "easeInOut" };
const variantsBackgroundContent = {
    hidden:  { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: transitionBackgroundContent },
};