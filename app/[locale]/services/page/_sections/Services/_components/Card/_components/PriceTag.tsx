"use client";

import { bagel_fat_one, handjet } from "@/fonts/fonts";
import cn from "classnames";
import { useTranslations } from "next-intl";
import s from "./style.module.scss";

export const PriceTag = ({
    price,
    comission,
}: {
    price: number;
    comission?: string;
})=> {
    const t = useTranslations("Services.pricing");
    const isComPresent = comission && comission !== "0%";

    return (
        <div
            className={s.price_unit}
        >
            <p className={cn(s.comission_tag, handjet.className)}>
                {isComPresent
                    ? t("withCommission", { commission: comission })
                    : comission
                        ? t("zeroCommission")
                        : t("withoutCommission")
                }
            </p>
            <div className={s.price_container}>
                <span className={cn(s.from, bagel_fat_one.className)}>
                    {t("from")}
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
