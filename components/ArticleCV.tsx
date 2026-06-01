import { TitleCV } from "@/components/animations/TitleCV";
import { ReactNode } from "react";

export const ArticleCV = ({children, title}: {children: ReactNode, title: string})=> {

    return (
        <div className="z-20 flex flex-col gap-5">
            <TitleCV>
                {title}
            </TitleCV>
            {children}
        </div>
    );
};
