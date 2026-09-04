"use client";

import Image from "next/image";
import rawCards from "./data.json"
import s from "./style.module.scss";
import {
    ImagesIcon,
    ShoppingBagIcon,
    WrenchIcon,
    SaveIcon,
    LucideIcon
} from "lucide-react";
import cn from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const SwipingFolders = ()=> {
    const icons: Record<string, LucideIcon> = {
        "Showcase": ImagesIcon,
        "E-commerce": ShoppingBagIcon,
        "Platform": WrenchIcon,
        "Reservation": SaveIcon
    }

    const variants: Variants = {
        "initial": {
            // opacity: 0,
            translateY: "100%",
            translateX: "-25%",
        },
        "exit": {
            // opacity: 0,
            translateY: "180%",
            translateX: "-25%",
        }
    }

    const [cards, setCards] = useState(rawCards);
    const [leavingCard, setLeavingCard] 
        = useState<(typeof rawCards)[number] | null>(null);
    const isAnimating = useRef(false);

    useEffect(()=> {
        const interval = setInterval(()=> {
            if (isAnimating.current) return;
            
            setCards(prev=>{
                const lastCard = prev.at(-1);

                if (!lastCard) return prev;
                isAnimating.current = true;

                setLeavingCard(lastCard);

                return prev.slice(0, -1);
            });
        }, 3000);

        return ()=> clearInterval(interval);
    }, []);

    const handleCardLeave = () => {
        if (!leavingCard) return;

        setCards(prev=> [leavingCard, ...prev]);
        setLeavingCard(null);
        isAnimating.current = false;
    };

    return (
        <div className={s.folder_bar}>
            <AnimatePresence
                onExitComplete={handleCardLeave}
            >
            {cards.map((card, id) => {
                const Icon = icons[card.tag];

                return (
                    <motion.div
                        key={card.tag}
                        className={cn(
                            s.card
                        )}
                        style={{
                            rotateY: -20,
                            scale: (1 + (id * 0.1))
                        }}
                        initial={false}
                        exit="exit"
                        animate={{
                            opacity: 1,
                            translateX: `-${id * 10}%`,
                            translateY: `${id * 15}%`,
                        }}
                        transition={{
                            duration: 1,
                            ease: [0.34, 1.56, 0.64, 0.88],
                        }}
                        variants={variants}
                    >
                        <h3 className={s.tag}>
                            <Icon 
                                className="w-4 h-4"
                            />
                            <span>
                                {card.tag}
                            </span>
                        </h3>
                        <Image
                            src={card.img_cover} 
                            className="object-cover h-full"
                            loading="eager"
                            width={500}
                            height={360}
                            alt={card.tag} 
                        />
                    </motion.div>
                )
            })}
            </AnimatePresence>
        </div>
    )
}
