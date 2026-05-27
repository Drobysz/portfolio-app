import { ArticleCV } from "@/components/index";
import { impact, bagel_fat_one } from "@/fonts/fonts";
import education from "@/data_json/CV_Data/education.json";
import cn from "classnames";

export const Education = ()=> {
    return (
        <ArticleCV title="Education/Certificates">
            <div className="flex flex-col gap-8 px-5">
                {education.map( (formation, idx)=> (
                    <div
                        key={`id-formation-${idx}`}
                         className="flex flex-col gap-4"
                    >
                        <h3 className="flex gap-3 items-end max-[1110px]:flex-col max-[1110px]:items-start max-[1110px]:gap-1 max-[1110px]:text-sm">
                            <span className={cn("text-white text-lg", bagel_fat_one.className)}>
                                {formation.establishment}
                            </span>
                            <span className={cn("text-xl font-black text-zinc-400", impact.className)}>
                                {formation.duration}
                            </span>
                        </h3>
                        {formation.precisions.length > 0 && (
                            <ul className="pl-5 flex flex-col gap-4">
                                {formation.precisions.map( (precision, idx)=> (
                                    <li
                                        key={`id-precision-${idx}`}
                                        className="text-white"
                                    >
                                        ◉ {precision}
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