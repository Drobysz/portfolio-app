import { ProjectsContext } from "@/app/[locale]/projects/context/projects.context";
import { ProjectPanelProps } from "./ProjectPanel.props";
import { forwardRef, useContext, useLayoutEffect, useRef } from "react";
import { ProjectTag } from "@/components";
import cn from "classnames"
import { impact } from "@/fonts/fonts";
import s from "./style.module.scss";

export const ProjectPanel = forwardRef<HTMLDivElement, ProjectPanelProps>(
    ({ currentProject, index, setPosition }, forwardedRef)=> {
        const { setIndex, currentIndex } = useContext(ProjectsContext);
        const localRef = useRef<HTMLDivElement>(null);
        const projectTag = currentProject.tag
            ? currentProject.tag.toLocaleLowerCase().trim()
            : null;

        const setRefs = (node: HTMLDivElement | null) => {
            localRef.current = node;
            
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        const background = 
            currentIndex !== index 
            ?
                {
                    backgroundImage:    `url(${currentProject.cover_image_url})`,
                    backgroundSize:     "cover",
                    backgroundPosition: "center",
                }
            :
                { backgroundColor: "#171717" }

        useLayoutEffect(() => {
            const el = localRef.current;
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

        return (
            <div className="flex flex-col gap-2 cursor-pointer">
                <div
                    ref={setRefs}
                    className={cn(s.body, "group")}
                    onClick={()=> setIndex(index)}
                >
                    <div 
                        className={s.background_of_selected}
                        style={background}
                    />
                    {currentIndex !== index 
                        &&
                    projectTag !== null &&
                        <ProjectTag 
                            className={s.tag}
                            tagName={projectTag}
                        />
                    }
                    {currentIndex === index && 
                        <h3 className={cn(
                            s.title_of_selected, 
                            impact.className
                        )}>
                            {currentProject.title}
                        </h3>
                    }
                </div>
                {currentIndex !== index &&
                    <p className={s.subtitle}>
                        {currentProject.title}
                    </p>
                }
            </div>
        );
    }
);

ProjectPanel.displayName = "ProjectPanel";