"use client";

import { ScrollParagraph } from "@/components/animations/ScrollParagraph/ScrollParagraph"
import { bagel_fat_one } from "@/fonts/fonts";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import cn from "classnames";
import s from "./style.module.scss";

export const Quote = ()=> {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={ref}
            className={s.tunnel}
        >
            <div className={s.elevator}>
                <ScrollParagraph
                    className={cn(
                        bagel_fat_one.className,
                        s.quote_text,
                    )}
                    scrollYProgress={scrollYProgress}
                >
                    More than websites. Digital experiences built to showcase, sell, automate and grow — with thoughtful design, smooth interactions and technology that works behind the scenes.
                </ScrollParagraph>
            </div>
        </section>
    )
}