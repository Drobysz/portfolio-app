import { Metadata } from "next";
import styles from "./Resume.module.scss";
import { ContactData, CV } from "./page/index";

export const metadata: Metadata = {
    title: "Resumé",
    description: "Here you can familiarize with Alexander's resumé",
};

export default function ResumePage () {
    return(
        <section className={styles.resume_section}>
            <ContactData />
            <CV />
        </section>
    )
};