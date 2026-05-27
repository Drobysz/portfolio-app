'use client'

import { motion, useMotionValue } from "framer-motion";
import { SMBarProps } from "./SMbar.interface";
import { SMBlock } from "./_components/index";
import s from "./style.module.scss";

export const SMbar = ({SMList}: SMBarProps)=> {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.nav 
            className={s.body}
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