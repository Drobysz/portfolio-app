"use client"

import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { ReactNode, useContext } from "react";
import cn from "classnames";
import { AppContext } from "@/app/context/AppContext";

export const HeaderWrapper = ({children, className}: {children: ReactNode, className?: string})=> {
    const { isVisible, setVisible } = useContext(AppContext);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest)=> {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        };
    });

    return (
        <motion.header 
            className={cn('h-[58px] px-4 py-2 flex justify-between items-center sticky z-40 top-0 rounded-4xl mx-auto', className)}
            animate={{
                backdropFilter: isVisible ? "blur(10px)" : "none",
                boxShadow: isVisible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: isVisible ? "60%" : "100%",
                y: isVisible ? 20 : 0
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
        >
            {children}
        </motion.header>
    );
};