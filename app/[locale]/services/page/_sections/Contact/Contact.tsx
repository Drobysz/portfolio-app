"use client";

import {
    PixelizedVideoBackground
} from "@/components/animations/PixelizedVideoBackground/PixelizedVideoBackground";
import s from "./style.module.scss";
import { MainBtn } from "@/components";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import cn from "classnames";
import { press2p } from "@/fonts/fonts";
import { useWindowWidth } from "@/hooks";
import { useTranslations } from "next-intl";

export const Contact = ()=> {
    const router = useRouter();
    const t = useTranslations("Services.contact");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isBtnDesktop = useWindowWidth(540) as boolean;
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    const translateY = useTransform(
        scrollYProgress,
        [0, 1],
        ["-100%", "0%"],
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [1.8, 1.1],
    );

    return (
        <section
            className={s.section_container}
            ref={containerRef}
        >
            <motion.div 
                className={s.elevator}
                style={{
                    translateY: translateY,
                }}
            >
                <motion.div 
                    className={s.background_video_wrapper}
                    style={{
                        scale: scale,
                    }}
                >
                    <PixelizedVideoBackground 
                        videoSrc="/britney.mp4"
                        reverse
                    />
                    <div 
                        className={s.shader_background_container} 
                    />
                </motion.div>
                <div className={s.content_container}>
                    <h2 className={cn(
                        s.title,
                        press2p.className
                    )}>
                        {t("title")}
                    </h2>
                    <MainBtn
                        withArrow
                        icon="link"
                        size={isBtnDesktop ? "lg" : "md"}
                        color="white"
                        onClick={()=> router.push("https://linktr.ee/alexdrobysz")}
                    >
                        {t("cta")}
                    </MainBtn>
                </div>
            </motion.div>
        </section>
    )
}
