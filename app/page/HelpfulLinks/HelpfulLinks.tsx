import { WobbleContainer } from "@/components/index";
import Image from "next/image";
import styles from "./HelpfulLinks.module.scss";

export const HelpfulLinks = ()=>{
    return (
        <section className="grid grid-cols-3 gap-6 mb-50">
            <WobbleContainer 
                className={styles.container_1}
                href="https://github.com/Drobysz"
                color="rosy"
            >
                <h3 className={styles.container_title_1}>GitHub</h3>
                <Image 
                    src="/help_links/github.png"
                    className={styles.container_image_1}
                    width={600}
                    height={300}
                    alt="service img"
                />
            </WobbleContainer>
            <WobbleContainer 
                color="blue"
                className={styles.container_2}
                centralize
            >
                <h3 className={styles.container_title_2}>Enjoy the site</h3>
            </WobbleContainer>
            <WobbleContainer 
                className={styles.container_3}
                href="https://www.linkedin.com/in/alexander-drobyshevski-9656b2330/?trk=opento_sprofile_topcard"
                color="pinkish"
            >
                <h3 className={styles.container_title_3}>My LinkedIn</h3>
                <Image 
                    src="/help_links/linkedin.png"
                    className={styles.container_image_3}
                    width={600}
                    height={300}
                    alt="service img"
                />
            </WobbleContainer>
        </section>
    );
};