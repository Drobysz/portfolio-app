import { doppelganger } from "@/fonts/fonts";
import Image from "next/image";
import cn from "classnames";

export const Logo = ()=> {
    return (
        <div className="h-full flex gap-3 items-center">
            <Image 
                src="/logo.png"
                height={40}
                width={35}
                alt="logo"
            />
            <p className={cn('text-3xl text-white pt-2', doppelganger.className)}>Alexander Drobysz</p>
        </div>
    );
};