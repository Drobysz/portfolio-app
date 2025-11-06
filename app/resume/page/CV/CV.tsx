import { CardSpotlight, GlowingEffect } from "@/components/index";
import styles from "./CV.module.scss";
import { 
    AboutMe,
    Skills,
    Experience,
    Education
} from "./components/index";

export const CV = ()=> {
    return (
        <GlowingEffect
            className={styles.colorful_frame}
            glow
            disabled={false}
            spread={80}
        >
            <section className={styles.section_frame}>
                <div className={styles.contact_data_section}>
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