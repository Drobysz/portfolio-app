'use client'

import { useContext, useEffect, useRef, useState } from "react";
import { CursorProps } from "./types";
import { 
    Cursor,
    ProjectPanel,
    Loading,
    Switchers
} from "./_components";
import { ProjectsContext } from "../../context/projects.context";
import { AppContext } from "@/app/[locale]/context/app.context";
import s from "./style.module.scss";


export const ProjectsFeed = ()=> {
    const {
        projects,
        areProjectsLoading,
        projectsError,
        currentIndex,
    } = useContext(ProjectsContext);

    const { setMouseText } = useContext(AppContext);
    const prevIndexRef = useRef(currentIndex);

    const [position, setPosition] = useState<CursorProps>({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
    });

    const [hover, setHover] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
	const panelRef = useRef<Array<HTMLDivElement | null>>([]);

    const scrollToCard = (index: number) => {
        const container = containerRef.current;
        const el = panelRef.current[index];

        if (!container || !el) return;

        const left = 
            container.scrollLeft + 
            el.offsetLeft - 
            container.offsetLeft - 
            (container.clientWidth / 2) + 
            (el.clientWidth / 2);

        container.scrollTo({
            left,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        scrollToCard(currentIndex);

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
                className={s.feed_container}
            >
                <div className={s.feed_list}>
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