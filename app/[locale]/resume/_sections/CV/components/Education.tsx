import { ArticleCV } from "@/components/index";
import { impact, bagel_fat_one } from "@/fonts/fonts";
import education from "@/data_json/CV_Data/education.json";
import cn from "classnames";
import { useTranslations } from "next-intl";

export const Education = ()=> {
    const t = useTranslations("Resume");

    return (
        <ArticleCV title={t("sections.education")}>
            <div className="flex flex-col gap-8 px-5">
                {education.map( (formation, formationIdx)=> (
                    <div
                        key={`id-formation-${formationIdx}`}
                         className="flex flex-col gap-4"
                    >
                        <h3 className="flex gap-3 items-end max-[1110px]:flex-col max-[1110px]:items-start max-[1110px]:gap-1 max-[1110px]:text-sm">
                            <span className={cn("text-white text-lg", bagel_fat_one.className)}>
                                {t(`education.${formationIdx}.establishment`)}
                            </span>
                            <span className={cn("text-xl font-black text-zinc-400", impact.className)}>
                                {t(`education.${formationIdx}.duration`)}
                            </span>
                        </h3>
                        {formation.precisions.length > 0 && (
                            <ul className="pl-5 flex flex-col gap-4">
                                {formation.precisions.map( (_, idx)=> (
                                    <li
                                        key={`id-precision-${idx}`}
                                        className="text-white"
                                    >
                                        ◉ {t(`education.${formationIdx}.precisions.${idx}`)}
                                    </li>
                                ) )}
                            </ul>
                        )}
                    </div>
                ) )}
            </div>
        </ArticleCV>
    );
};
