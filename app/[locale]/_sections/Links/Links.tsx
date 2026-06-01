import { WobbleContainer } from "@/components/animations/WoobleContainer";
import Image from "next/image";
import styles from "./Links.module.scss";
import { useTranslations } from "next-intl";

export const Links = ()=>{
    const t = useTranslations("Home.links");

    return (
        <section className={styles.body}>
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
                    sizes="(max-width: 785px) 0px, (max-width: 1080px) 600px, 600px"
                    style={{ height: "auto" }}
                    alt={t("serviceAlt")}
                />
            </WobbleContainer>
            <WobbleContainer 
                color="blue"
                className={styles.container_2}
                centralize
            >
                <h3 className={styles.container_title_2}>{t("enjoy")}</h3>
            </WobbleContainer>
            <WobbleContainer 
                className={styles.container_3}
                href="https://www.linkedin.com/in/alexander-drobyshevski-9656b2330/?trk=opento_sprofile_topcard"
                color="pinkish"
            >
                <h3 className={styles.container_title_3}>{t("linkedin")}</h3>
                <Image 
                    src="/help_links/linkedin.png"
                    className={styles.container_image_3}
                    width={600}
                    height={300}
                    sizes="(max-width: 430px) 0px, (max-width: 1080px) 600px, 600px"
                    style={{ height: "auto" }}
                    alt={t("serviceAlt")}
                />
            </WobbleContainer>
        </section>
    );
};
