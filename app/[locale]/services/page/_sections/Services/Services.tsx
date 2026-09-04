"use client";

import s from "./style.module.scss";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import services from "@/data_json/services.json";
import {
    Card,
} from "./_components";
import { useWindowWidth } from "@/hooks";
import { Service } from "./types";

const serviceList = services as Service[];

export const Services = ()=> {
    const refTunnel = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: refTunnel,
        offset: ["start start", "end end"]
    });
    const isDesktop = useWindowWidth(620) as boolean;

    return (
        <section
            className={s.services_container}
            style={{
                minHeight: `${100 * serviceList.length + (isDesktop ? 35 : 5)}vh`
            }}
            ref={refTunnel}
        >
            {serviceList.map((svc, i) =>
                <div
                    key={svc.id}
                    className={s.card_container}
                    style={{
                        top: `calc(-10% + ${i * 25}px)`
                    }}
                >
                    <Card 
                        order={i}
                        progress={scrollYProgress}
                        cardLen={serviceList.length}
                        service={svc}
                    />
                </div>
            )}
        </section>
    )
}
