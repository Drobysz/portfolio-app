"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/app.context";
import s from "./style.module.scss";
import { useMouseCoordinates } from "@/hooks";
import { motion, Transition } from "framer-motion";

export const MouseGuide = ()=> {
    const {
        mouseText
    } = useContext(AppContext);
    const [visible, setVisible] = useState(false);
    const {x, y} = useMouseCoordinates(visible);

    useEffect(()=> {
        if (!mouseText) {
            setVisible(false);
            return;
        };

        setTimeout(() => {
             setVisible(true);
        }, 0);

        const timoutId = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return ()=> clearTimeout(timoutId);
    }, [mouseText]);

    if (!mouseText) return null;

    const variants = {
        "visible": {
            opacity: 1,
            scale: 1,
            transform: "translate(2rem, 2rem)",
            x: 32,
            y: 32,
        },
        "unvisible": {
            opacity: 0,
            scale: 0.5,
            x: 0,
            y: 12,
        }
    }

    const transition: Transition = { 
        type: "spring", 
        bounce: 0.25, 
        duration: 0.7 
        // damping: 300
    };

    return (
        <motion.div 
            className={s.body}
            style={{
                left: x,
                top: y
            }}
            initial={"unvisible"}
            animate={visible ? "visible" : "unvisible"}
            variants={variants}
            transition={transition}
        >
            {mouseText}
        </motion.div>
    )
}
