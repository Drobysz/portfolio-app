'use client'

import { motion } from "framer-motion"; 
import { FC } from "react";
import BtnProps from "./BubleText.props";

import styles from './Bubble.module.scss';

export const Bubletext: FC<BtnProps> = ({text, className}) => {
    return (
        <motion.h2 
            className={className}
            transition={{
                mass: 0.1,
                stiffness: 150,
                damping: 12,
            }}
            initial={{
                opacity: 0,
                y: -10
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true,
                amount: 0.5
            }}
            >
            {text.split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </motion.h2>
    );
};