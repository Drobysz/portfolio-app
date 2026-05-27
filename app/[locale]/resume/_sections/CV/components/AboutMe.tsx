import { ArticleCV } from "@/components/index";
import { useTranslations } from "next-intl";

export const AboutMe = ()=> {
    const t = useTranslations("Resume");

    return (
        <ArticleCV title={t("sections.about")}>
            <p className="text-white/40 font-bold text-lg px-3 max-[700px]:text-sm max-[350px]:text-xs">
                {t("about.text")}
            </p>
        </ArticleCV>
    );
};
