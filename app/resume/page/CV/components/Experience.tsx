import { ArticleCV } from "@/components/index";
import { impact, avenir, bagel_fat_one } from "@/fonts/fonts";
import experience from "@/data_json/CV_Data/experience.json";
import cn from "classnames";

export const Experience = ()=> {
    return (
        <ArticleCV title="Experience">
            <div className="flex flex-col gap-10 px-4">
                {experience.map( (period, idx)=> (
                    <div
                        key={`id-${idx}`}
                        className="flex flex-col gap-5"
                    >
                        <h3
                            key={`id-${idx}`}
                            className={cn("text-zinc-500 font-black text-lg", impact.className)}
                        >
                            {period.duration}
                        </h3>
                        <ul className="pl-5 flex flex-col gap-6">
                            {period.jobs.map( (job, idx)=> (
                                <li 
                                    key={`job_id-${idx}`}
                                    className="flex gap-4"
                                >
                                    <h4 className={cn("text-white/70 italic text-xl max-[1110px]:text-lg max-[950px]:text-base", bagel_fat_one.className)}>
                                        {job.position}
                                    </h4>
                                    <p className={cn("text-white text-lg font-black max-[1110px]:text-base max-[950px]:text-sm", avenir.className)}>
                                        - {job.tasks}
                                    </p>
                                </li>
                            ) )}
                        </ul>
                    </div>
                ) )}
            </div>
        </ArticleCV>
    );
};