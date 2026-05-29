import { ProjectsContext } from "@/app/[locale]/projects/context/projects.context";
import { ProjectPanelProps } from "./ProjectPanel.props";
import { useContext, useLayoutEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import cn from "classnames"
import { impact } from "@/fonts/fonts";
import s from "./style.module.scss";

export const ProjectPanel = ({ currentProject, index, setPosition }: ProjectPanelProps)=> {
    const { setIndex, setHover, currentIndex } = useContext(ProjectsContext);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const background = 
        currentIndex !== index 
        ?
            {
                backgroundImage:    `url(${currentProject.cover_image_url})`,
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
                router.push(`/projects/${currentProject.slug}`)    
                break;
        }
    }; 

    return (
        <div
            ref={ref}
            className={cn(s.body, "group")}
            onMouseEnter={()=> handleInteraction(true)}
            onMouseLeave={()=> handleInteraction(false)}
            onClick={()=> handleInteraction("clicked")}
        >
            <div 
                className={s.background_of_selected}
                style={background}
            />
            { currentIndex === index && (
                <h3 className={cn(
                    s.title_of_selected, 
                    impact.className
                )}>
                    {currentProject.title}
                </h3>
            )}
        </div>
    );
};