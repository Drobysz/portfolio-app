'use client'

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { LinkImageBtnProps } from "./LinkImageBtn.interface";

export const LinkImageBtn = ({ img, children }: LinkImageBtnProps)=> {
    const iconRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const [isHovered, setHover] = useState(false); 
    const mouseX = useMotionValue(0);

    const cursorDistance = useTransform(mouseX, (horizontalCoordindate)=> {
        const border = btnRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        const iconWidth = iconRef.current?.getBoundingClientRect().width ?? 50;
        return horizontalCoordindate - (border!.x + iconWidth/2);
    });

    return (
        <div 
            className="relative"
            ref={btnRef}

            onMouseMove={(e)=> mouseX.set(e.pageX)}
            onMouseEnter={()=> setHover(true)}
            onMouseLeave={()=> setHover(false)}
        >
            {children}
            {isHovered && (
                <AnimatePresence>
                    <motion.div
                        ref={iconRef}
                        className="-top-44 absolute max-w-3xs mx-auto h-[10rem] w-full border-4 border-[#6C6C6C] p-4 bg-[#222222] rounded-4xl shadow-2xl"

                        style={{x: cursorDistance}}


                        transition = {{
                            type: "spring",
                            stiffness: 560,
                            mass: 10,
                            damping: 40,
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                    >
                        <motion.div 
                            className="h-full w-full overflow-hidden rounded-2xl bg-zinc-900 p-2"
                            style={{
                                backgroundImage: `url(${img})`,
                                backgroundSize: "cover",
                            }}
                        />
                    </motion.div>
                </AnimatePresence> 
            )}
        </div>
    );
};