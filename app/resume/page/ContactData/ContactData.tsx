import { GlowingEffect } from "@/components/index";
import { tronecal } from "@/fonts/fonts";
import { Contacts, ContactImage } from "./components";
import styles from "./ContactData.module.scss";
import cn from "classnames";

export const ContactData = ()=> {
    return (
        <GlowingEffect
            className={styles.colorful_frame}
            glow
            disabled={false}
            spread={80}
        >
            <section className={styles.section_frame}>
                <div className={styles.contact_data_section}>
                    <ContactImage />
                    <h3 className={cn(
						"text-white mb-2",
						tronecal.className
					)}>
						Alexander DROBYSHEVSKY
					</h3>
                    <Contacts />
                </div>
            </section>
        </GlowingEffect>
    );
};