'use client'

import { useContext, useEffect, useRef, useState } from "react";
import s from "./style.module.scss";
import { CursorProps } from "./types";
import { 
    Cursor,
    ProjectPanel,
    Loading,
    Switchers
} from "./_components";
import { ProjectsContext } from "../../context/projects.context";
import { AppContext } from "@/app/[locale]/context/app.context";


export const ProjectsFeed = ()=> {
    const {
        projects,
        areProjectsLoading,
        projectsError,
        currentIndex,
    } = useContext(ProjectsContext);

    const { 
        setMouseText,
    } = useContext(AppContext);

    const [position, setPosition] = useState<CursorProps>({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
    });

    const [hover, setHover] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
	const panelRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
		const container = containerRef.current;
		const el = panelRef.current[currentIndex];

		if (!el) return;

		container?.scrollTo({
			behavior: "smooth",
			left: el.offsetLeft - container.offsetLeft
		});

		if (currentIndex === 0) {
			container!.scrollTo({ left: 0, behavior: 'smooth' });
			return;
		}

	}, [currentIndex]);

    const mouseGuideText = "Press left and right arrow keys to swipe cards";

    const handleMouseEnter = ()=> {
        setMouseText(mouseGuideText);
        setHover(true);
    };

    const handleMouseLeave = ()=> {
        setMouseText("");
        setHover(false);
    };

    return (
        <section 
            className={s.feed_layout}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Switchers 
                isHovered={hover}
            />
            <div
                ref={containerRef}
                className="overflow-x-hidden w-full max-[780px]:overflow-x-auto"
            >
                <div className="flex items-start gap-6 relative">
                    {!projectsError && !areProjectsLoading && projects 
                        && projects.map( (p, index)=> (
                        <ProjectPanel
                            key={`${p.slug}-${index}`} 
                            currentProject={p} 
                            index={index}
                            setPosition={setPosition}
                            ref={(el) => {
                                panelRef.current[index] = el;
                            }}
                        /> 
                    ))}
                    {areProjectsLoading && <Loading />}
                    <Cursor position={position}/>
                </div>
            </div>
        </section>
    );
};