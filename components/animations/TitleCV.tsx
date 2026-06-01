import { bagel_fat_one } from "@/fonts/fonts";
import cn from "classnames";
import { ReactNode } from "react";

export const TitleCV = ({ children }: { children: ReactNode })=> {
    return (
        <h2 className={cn("bg-white/90 rounded-4xl text-2xl text-center max-[865px]:text-xl max-[700px]:text-lg", bagel_fat_one.className)}>
            {children}
        </h2>
    );
};
