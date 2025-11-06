"use client"

import { useLayoutEffect, useRef, useState } from "react";
import { RotatingIconProps } from "./RotatingIcon.interface";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import cn from "classnames";
import styles from "./RotatingIcon.module.scss";

export const RotatingIcon = ({ img, title }: RotatingIconProps)=> {
    const ref = useRef<HTMLElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({target: ref});

    const [movementHeight, setMovementHeight] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current || !iconRef.current || !headingRef.current) return;

        const measure = () => {
            const fh = ref.current!.getBoundingClientRect().height;
            const ih = iconRef.current!.getBoundingClientRect().height;
            const hh = headingRef.current!.getBoundingClientRect().height;
            setMovementHeight(fh - (ih + hh + 60));
        };

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(ref.current);
        ro.observe(iconRef.current);
        ro.observe(headingRef.current);

        return () => {
            ro.disconnect();
        };
    }, []);

    const translateY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, movementHeight]
    );

    const rotateY = useTransform(
        scrollYProgress,
        [0, 1],
        [25, 0]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [1.05, 1]
    );

    // Movements around axe Y animation
    const [isHovered, setHover] = useState(false);
    const mouseX = useMotionValue(0);
    
    const cursorDistance = useTransform(mouseX, (horizontalCoordindate)=> {
        const border = iconRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        const iconWidth = iconRef.current?.getBoundingClientRect().width ?? 50;

        return horizontalCoordindate - (border.x + iconWidth/2);
    });

    const rotateX = useTransform(
        cursorDistance,
        [-1500, 1500],
        [50, -50]
    );

    return (
        <section 
            ref={ref}
            className={styles.rotating_icon_section}
        >
            <h1 
                ref={headingRef}
                className={styles.title}
            >
                {title}
            </h1>
            <motion.div
                ref={iconRef}
                className={styles.icon_body}
                onMouseMove={(e)=> mouseX.set(e.pageX)}
                onMouseEnter={()=> setHover(true)}
                onMouseLeave={()=> setHover(false)}
                style={{
                    rotateY: isHovered ? rotateX : 0,
                    rotateX: rotateY,
                    scale: scale,
                    translateY: translateY
                }}
            >
                <motion.div 
                    className={cn(styles.icon_content, {
                        ['scale-3d scale-105 perspective-distant']: isHovered
                    })}
                    style={{
                        backgroundImage: `url(/project_images/${img}.png)`,
                        backgroundSize: "cover",
                    }}
                />
            </motion.div>
        </section>
    );
};