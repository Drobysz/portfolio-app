import { doppelganger } from "@/fonts/fonts";
import Image from "next/image";
import cn from "classnames";

export const Logo = ({
    className, 
    titleClassName,
    isVisible
}: {
    className?: string, 
    titleClassName?: string,
    isVisible: boolean
})=> {
    return (
        <div className={cn(
            "h-full flex gap-3 items-center", 
            className
        )}>
            <Image
                className="max-[445px]:h-8.75 max-[445px]:w-7.5"
                src="/logo.png"
                height={40}
                width={35}
                alt="logo"
            />
            {isVisible &&
                <p className={cn(
                    'text-3xl text-white pt-2 shrink-0 max-[445px]:hidden', 
                    doppelganger.className, 
                    titleClassName
                )}>
                    Alexander Drobysz
                </p>
            }
        </div>
    );
};