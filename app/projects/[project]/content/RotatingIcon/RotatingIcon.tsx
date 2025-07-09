"use client"

import { useLayoutEffect, useRef, useState } from "react";
import { RotatingIconProps } from "./RotatingIcon.interface";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import cn from "classnames";
// import { useWindowWidth } from "@/hooks/useWindowWidth";

export const RotatingIcon = ({ img, title }: RotatingIconProps)=> {
    const ref = useRef<HTMLElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({target: ref});

    const [movementHeight, setMovementHeight] = useState(0);
    // const width = useWindowWidth();

    useLayoutEffect(() => {
        if (!ref.current || !iconRef.current || !headingRef.current) return;

        // функция измерения
        const measure = () => {
            const fh = ref.current!.getBoundingClientRect().height;
            const ih = iconRef.current!.getBoundingClientRect().height;
            const hh = headingRef.current!.getBoundingClientRect().height;
            setMovementHeight(fh - (ih + hh + 60));
        };

        // сразу одно измерение
        measure();

        // подписываемся на любые изменения размеров
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

        return horizontalCoordindate - (border!.x + iconWidth/2);
    });

    const rotateX = useTransform(
        cursorDistance,
        [-1500, 1500],
        [50, -50]
    );

    return (
        <section 
            ref={ref}
            className="relative w-full h-[140vh] flex flex-col items-center perspective-midrange pt-10 max-[655px]:h-[125vh] mb-5 max-[550px]:mb-2"
        >
            <h1 
                ref={headingRef}
                className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-pinkish text-center font-bold text-8xl pt-20 max-[610px]:text-7xl max-[475px]:text-6xl max-[430px]:text-5xl max-[341px]:text-4xl"
            >
                {title}
            </h1>
            <motion.div
                ref={iconRef}
                className="max-w-xl -mt-12 mx-auto h-[20rem] w-full border-4 border-[#6C6C6C] p-6 bg-[rgb(34,34,34)] rounded-[30px] shadow-2xl max-[991px]:h-[18rem] max-[991px]:max-w-lg max-[700px]:h-[15rem] max-[700px]:max-w-sm max-[700px]:p-4 max-[700px]:-mt-10 max-[450px]:h-[13rem] max-[341px]:max-w-3xs max-[341px]:h-[8rem] max-[341px]:p-2 max-[341px]:rounded-lg"
                onMouseMove={(e)=> mouseX.set(e.pageX)}
                onMouseEnter={()=> setHover(true)}
                onMouseLeave={()=> {setHover(false)}}
                style={{
                    rotateY: isHovered ? rotateX : 0,
                    rotateX: rotateY,
                    scale: scale,
                    translateY: translateY
                }}
            >
                <motion.div 
                    className={cn("h-full w-full rounded-2xl max-[341px]:rounded-lg bg-zinc-900 md:rounded-2xl p-4 transition-all duration-300",{
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