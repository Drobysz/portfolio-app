'use client'

import { useRef } from "react";
import { Bubletext } from "@/components/index";
import { Line, Events } from "./components/index";
import styles from "./Timeline.module.scss";
import { useScroll, useSpring, useTransform } from "framer-motion";

export const Timeline = ()=> {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref
    });
    const scaleY = useSpring(scrollYProgress);
    const background = useTransform(scrollYProgress,
        [0, 1],
        ['#0F1EF0', '#A9389F']
    );

    return (
        <section 
            ref={ref} 
            className={styles.timeline_section}
        >
            <Line 
                scaleY={scaleY}
                background={background}
            />
            <Bubletext 
                text="History in timeline" 
                className={styles.buble_text}
            />
            <Events />
        </section>
    );
};