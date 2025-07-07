import { doppelganger } from "@/fonts/fonts";
import Image from "next/image";
import cn from "classnames";

export const Logo = ({className, titleClassName}: {className?: string, titleClassName?: string})=> {
    return (
        <div className={cn("h-full flex gap-3 items-center", className)}>
            <Image 
                src="logo.png"
                height={40}
                width={35}
                alt="logo"
            />
            <p className={cn('text-3xl text-white pt-2', doppelganger.className, titleClassName)}>Alexander Drobysz</p>
        </div>
    );
};