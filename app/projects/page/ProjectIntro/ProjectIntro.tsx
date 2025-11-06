'use client'

import cn from "classnames";

import { 
    Shadow,
    ProjectImage,
    ProjectIntroInfo
} from "./components/index";

export const ProjectIntro = ()=> {
    return (
        <section className={cn(
            "relative pt-8 mb-15",
            "h-[55vh] flex items-center"
        )}>
            <ProjectIntroInfo />
            <Shadow />
            <ProjectImage />
        </section>
    );
};