import { ArticleCV } from "@/components/index";
import about_me from "@/data_json/CV_Data/about_me.json";

export const AboutMe = ()=> {
    return (
        <ArticleCV title="About me">
            <p className="text-white/40 font-bold text-lg px-3 max-[700px]:text-sm max-[350px]:text-xs">
                {about_me.text}
            </p>
        </ArticleCV>
    );
};