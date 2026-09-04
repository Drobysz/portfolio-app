import { MotionValue, useTransform, motion } from "framer-motion";
import { Service } from "../../types";
import s from "../../style.module.scss";
import cn from "classnames";
import { bagel_fat_one, doppelganger, handjet, inter, press2p, tronecal } from "@/fonts/fonts";

const PriceTag = ({
    price,
    comission,
}: {
    price: number;
    comission?: string;
})=> {
    const isComPresent = comission && comission !== "0%";

    return (
        <div
            className={s.price_unit}
        >
            <p className={cn(s.comission_tag, handjet.className)}>
                {isComPresent
                    ? `with comission ${comission}`
                    : comission
                        ? "none comission"
                        : "with no comission"
                }
            </p>
            <div className={s.price_container}>
                <span className={cn(s.from, bagel_fat_one.className)}>
                    from
                </span>
                <span className={s.price_tag}>
                    <span className={cn(s.price, bagel_fat_one.className)}>
                        {price * (isComPresent ? 1 : 2.5)}
                    </span>
                    <span className={s.currency}>
                        €
                    </span>
                </span>
            </div>
        </div>
    )
}

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
                {service.name}
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
                {service.description}
            </p>
        </motion.div>
    )
}