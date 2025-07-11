'use client'

import { useRouter } from "next/navigation";
import { BtnProps } from "./CustomBtn.interface";
import cn from "classnames";

export const CustomBtn = ({ color="white", size="medium", link, children, className }: BtnProps)=> {
    const router = useRouter();

    return (
        <button
            onClick={()=> router.push(link)}
            className={cn("transition-all cursor-pointer duration-300 ease-in-out w-fit h-fit", className, {
                // Size
                ["px-3 py-2 text-3xl rounded-2xl font-bold max-[750px]:text-xl max-[560px]:rounded-lg max-[560px]:px-1.5 max-[560px]:py-1"]: size==="medium",
                ["px-1.5 py-1 rounded-xl"]: size==="small",
                
                // Color
                ["bg-white hover:bg-neutral-300 hover:scale-103 active:scale-97 active:rotate-1"]: color==="white",
                ["border-2 border-white text-white hover:border-neutral-300 hover:text-neutral-300 hover:scale-x-105 active:scale-97"]: color==="ghost",
            })} 
        >
            {children}
        </button>
    );
};