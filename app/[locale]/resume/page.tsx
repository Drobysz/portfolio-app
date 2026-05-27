import { Metadata } from "next";
import styles from "./Resume.module.scss";
import { ContactData, CV } from "./_sections/index";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.resume" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ResumePage () {
    return(
        <section className={styles.resume_section}>
            <ContactData />
            <CV />
        </section>
    )
};
