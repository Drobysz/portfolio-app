import { GlowingEffect } from "@/components/animations/GlowingEffect";
import { CardSpotlight } from "@/components/animations/Spotlight";
import s from "./CV.module.scss";
import { 
    AboutMe,
    Skills,
    Experience,
    Education
} from "./_components/index";
import cn from "classnames";

export const CV = ()=> {
    return (
        <GlowingEffect
            className={s.colorful_frame}
            glow
            disabled={false}
            spread={80}
        >
            <section className={s.section_frame}>
                <div 
                    className={cn(
                        s.contact_data_section,
                        s.no_scrollbar
                    )}
                    data-lenis-prevent
                    
                >
                    <CardSpotlight className="flex flex-col gap-12 justify-between">
                        <AboutMe />
                        <Skills />
                        <Experience />
                        <Education />
                    </CardSpotlight>
                </div>
            </section>
        </GlowingEffect>
    );
};
