import { ArticleCV } from "@/components/index";
import { tronecal } from "@/fonts/fonts";
import skills from "@/data_json/CV_Data/skills.json";
import cn from "classnames";

export const Skills = ()=> {
    return (
        <ArticleCV title="Skills">
            <div className="flex flex-col gap-4 px-4 max-[900px]:flex-col max-[900px]:gap-10">
                {Object.entries(skills).map( ([category, list], idx)=> (
                    <div 
                        className="flex gap-6 items-center max-[900px]:flex-col"
                        key={`id-${idx}`}
                    >
                        <h3 className={cn(`w-fit text-white/70 font-bold`, tronecal.className)}>
                            {category}
                        </h3>
                        <p className="flex flex-wrap gap-1.5">
                            {list.map( (stack: string, idx: number)=> (
                                <span className="text-white/40 text-md font-extrabold italic" key={`id-${idx}`}>
                                    {stack}{idx+1 === list.length ? "." : ","}
                                </span>
                            ) )}
                        </p>
                    </div>
                ) )}
            </div>
        </ArticleCV>
    );
};