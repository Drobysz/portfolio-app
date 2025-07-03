'use client'

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { SMobj, SMBarProps } from "./SMbar.interface";
import Link from "next/link";
import { useRef, useState } from "react";

export const SMbar = ({SMList}: SMBarProps)=> {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.nav 
            className="flex items-end justify-between gap-6 h-16 rounded-2xl px-4 pb-2 bg-neutral-900"
            onMouseMove={(e)=> mouseX.set(e.pageX)}
            onMouseLeave={()=> mouseX.set(Infinity)}
        >
            {SMList.map(({title, link, img})=> (
                <SMBlock 
                    key={`id-${title}`} 
                    title={title}
                    link={link}
                    img={img}
                    mouseX={mouseX}
                />
            ))}
        </motion.nav>
    );
};

const SMBlock = ({
    title,
    link,
    img,
    mouseX
}: SMobj)=> {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const distance = useTransform(mouseX, (horizontalCoordindate)=> {
        const border = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return horizontalCoordindate - (border!.x + border!.width/2);
    });

    const blockTransform = useTransform(
        distance,
        [-150, 0, 150],
        [50, 80, 50]
    );

    const iconTransform = useTransform(
        distance,
        [-150, 0, 150],
        [50, 80, 50]
    );

    const transition = {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    };

    const blockSize = useSpring(blockTransform, transition);
    const iconSize = useSpring(iconTransform, transition);

    return (
        <Link 
            href={`${link}`}
            target="_blank"
        >
            <motion.div 
                className="relative flex rounded-full items-center justify-center bg-neutral-800"
                ref={ref}

                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}

                style={{
                    width: blockSize,
                    height: blockSize
                }}

                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
            >
                {hovered && (
                    <AnimatePresence>
                        <motion.p
                            className="absolute -top-8 w-fit rounded-md border border-neutral-900 text-neutral-400 text-xs p-1.5 bg-neutral-800"

                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 2 }}
                        >
                            {title}
                        </motion.p>
                    </AnimatePresence>
                    
                )}
                <motion.img
                    className="p-2"
                    src={img}
                    style={{ 
                        width: iconSize,
                        height: iconSize 
                    }}
                    alt="social media"
                />
            </motion.div>
        </Link>  
    );
};