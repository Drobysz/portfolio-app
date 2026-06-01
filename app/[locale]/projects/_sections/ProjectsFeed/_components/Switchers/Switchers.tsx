"use client";

import { useContext, useEffect } from "react";
import s from "./style.module.scss";
import { 
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import cn from "classnames";
import { motion, Transition } from "framer-motion";
import { ProjectsContext } from "@/app/[locale]/projects/context/projects.context";

export const Switchers = ({
    isHovered
}: {
    isHovered: boolean
})=> {
    const {
        currentIndex,
        setIndex,
        projects
    } = useContext(ProjectsContext);

    if (!projects) return null;

    const projectNb = projects.length;

    const nextLeftIndex = currentIndex - 1;
    const nextRightIndex = currentIndex + 1;

    const isLeftActive = nextLeftIndex >= 0;
    const isRightActive = nextRightIndex < projectNb;

    const handleLeftClick = ()=> {
        if (isLeftActive) {
            setIndex(Math.max(0, nextLeftIndex));
        }
    };

    const handleRightClick = ()=> {
        if (isRightActive) {
            setIndex(Math.min(projectNb - 1, nextRightIndex));
        }
    };

    useEffect(()=> {
        const handleKeyDown = (e: KeyboardEvent)=> {
            switch (e.key) {
				case "ArrowLeft":
                    if (isLeftActive) {
                        setIndex(Math.max(0, nextLeftIndex));
                    }
					break;

				case "ArrowRight":
					if (isRightActive) {
                        setIndex(Math.min(projectNb - 1, nextRightIndex));
                    }
					break;
			
				default:
					break;
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return ()=> document.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    useEffect(() => {
        return () => {
            document.documentElement.classList.remove("is-switcher-hovered");
        };
    }, []);

    const handleSwitcherPointerEnter = () => {
        document.documentElement.classList.add("is-switcher-hovered");
    };

    const handleSwitcherPointerLeave = () => {
        document.documentElement.classList.remove("is-switcher-hovered");
    };

    const variantsLeft = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const variantsRight = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

    const transition: Transition = {
        type: "tween",
        duration: 0.1,
        ease: "easeIn",
    };

    return (
        <>
            {isLeftActive &&
                <motion.div 
                    className={cn(
                        s.space,
                        s.shadow_left,
                        "left-0 cursor-pointer"
                    )}
                    animate={{
                        opacity: isHovered ? 1 : 0.9
                    }}
                    onPointerEnter={handleSwitcherPointerEnter}
                    onPointerLeave={handleSwitcherPointerLeave}
                >
                    <motion.button
                        className={cn(s.switcher, "cursor-pointer")}
                        onClick={handleLeftClick}
                        animate={isHovered ? "visible" : "hidden"}
                        variants={variantsLeft}
                        transition={transition}
                    > 
                        <ChevronLeft />
                    </motion.button>
                </motion.div>
            }
            {isRightActive &&
                <motion.div 
                    className={cn(
                        s.space,
                        s.shadow_right,
                        "right-0 justify-end cursor-pointer"
                    )}
                    animate={{
                        opacity: isHovered ? 1 : 0.9
                    }}
                    onPointerEnter={handleSwitcherPointerEnter}
                    onPointerLeave={handleSwitcherPointerLeave}
                >
                    <motion.button
                        className={cn(s.switcher, "cursor-pointer")}
                        onClick={handleRightClick}
                        animate={isHovered ? "visible" : "hidden"}
                        variants={variantsRight}
                        transition={transition}
                    >
                        <ChevronRight />
                    </motion.button>
                </motion.div>
            }
        </>
    )
}
