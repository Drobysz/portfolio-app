"use client";

import { MotionValue, useTransform, motion } from "framer-motion";
import { Service } from "../../types";
import s from "./style.module.scss";
import cn from "classnames";
import { handjet, press2p } from "@/fonts/fonts";
import { useTranslations } from "next-intl";
import { PriceTag } from "./_components/PriceTag";

export const Card = ({
    order,
    progress,
    cardLen,
    service,
}: {
    order: number;
    progress: MotionValue<number>;
    cardLen: number;
    service: Service;
})=> {
    const t = useTranslations("Services");
    const rangeProgress = [order * 0.25, 1];
    const rangeScale = [1, 1 - ((cardLen - order) * 0.05)];
    const scale = useTransform(
        progress,
        rangeProgress,
        rangeScale
    );

    return (
        <motion.div
            className={s.card}
            style={{
                scale: scale,
            }}
        >
            <h2
                className={cn(
                    s.title,
                    handjet.className
                )}
            >
                {t(`categories.${service.id}`)}
            </h2>
            <div className={s.price_bar}>
                <PriceTag 
                    price={service.price}
                />
                {service.comission &&
                    <>
                        <div 
                            className={s.separator}
                        />
                        <PriceTag 
                            price={service.price}
                            comission={service.comission}
                        />
                    </>
                }
            </div>
            <p className={cn(
                s.desc,
                press2p.className,
            )}>
                {t(`cards.${service.id}.description`)}
            </p>
        </motion.div>
    )
}
