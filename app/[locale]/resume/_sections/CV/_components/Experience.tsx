import { ArticleCV } from "@/components/index";
import { impact, avenir, bagel_fat_one } from "@/fonts/fonts";
import experience from "@/data_json/CV_Data/experience.json";
import cn from "classnames";
import { useTranslations } from "next-intl";

export const Experience = ()=> {
    const t = useTranslations("Resume");

    return (
        <ArticleCV title={t("sections.experience")}>
            <div className="flex flex-col gap-10 px-4">
                {experience.map( (period, periodIdx)=> (
                    <div
                        key={`id-${periodIdx}`}
                        className="flex flex-col gap-5"
                    >
                        <h3
                            key={`id-${periodIdx}`}
                            className={cn("text-zinc-500 font-black text-lg", impact.className)}
                        >
                            {t(`experience.${periodIdx}.duration`)}
                        </h3>
                        <ul className="pl-5 flex flex-col gap-6">
                            {period.jobs.map( (job, jobIdx)=> (
                                <li 
                                    key={`job_id-${jobIdx}`}
                                    className="flex flex-col"
                                >
                                    <h4 className={cn("text-white/70 italic text-xl max-[1110px]:text-lg max-[950px]:text-base", bagel_fat_one.className)}>
                                        {t(`experience.${periodIdx}.jobs.${jobIdx}.position`)}
                                    </h4>
                                    <ul className="flex flex-col gap-4">
                                        {job.tasks.map((_, taskIdx)=> (
                                            <p 
                                                key={`subtask_${taskIdx}`}
                                                className={cn("text-white pl-5 text-lg font-black max-[1110px]:text-base max-[950px]:text-sm flex gap-2", avenir.className)}
                                            >
                                                <span className="pt-[0.05rem]">◉</span>
                                                {t(`experience.${periodIdx}.jobs.${jobIdx}.tasks.${taskIdx}`)}
                                            </p>   
                                        ))}
                                    </ul>
                                </li>
                            ) )}
                        </ul>
                    </div>
                ) )}
            </div>
        </ArticleCV>
    );
};
