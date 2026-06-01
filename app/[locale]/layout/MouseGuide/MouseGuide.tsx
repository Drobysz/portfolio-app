"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/app.context";
import s from "./style.module.scss";
import { useMouseCoordinates } from "@/hooks";
import { motion, Transition } from "framer-motion";

export const MouseGuide = ()=> {
    const {
        mouseText
    } = useContext(AppContext);
    const [visible, setVisible] = useState(false);
    const [isEnoughSpaceRight, setIsEnoughSpaceRight] = useState(true);
    const {x, y} = useMouseCoordinates(visible);
    const ref = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const element = ref.current;

        if (!element || !mouseText || !visible) return;

        const windowWidth = window.innerWidth;
        const elementRightEdge = x + element.offsetWidth;

        console.log(elementRightEdge < windowWidth)

        setIsEnoughSpaceRight(elementRightEdge < windowWidth);
    }, [mouseText, x]);

    if (!mouseText) return null;

    const variants = {
        "visible": {
            opacity: 1,
            scale: 1,
            x: isEnoughSpaceRight ? 32 : "-110%",
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
            ref={ref}
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
