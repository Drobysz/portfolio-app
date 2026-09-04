"use client"

import { useWindowWidth } from "@/hooks";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AppContext } from "@/app/[locale]/context/app.context";
import cn from "classnames";

export const MenuBtn = ({className}: {className: string})=> {
    const isDesktop = useWindowWidth(770) as boolean;
    const { isMenuOpened, setMenuOpened } = useContext(AppContext);

    useEffect(()=> {
        if (isDesktop)
            setMenuOpened(false);
    },[isDesktop]);

    return (
        <div className={cn("hover:opacity-80 hover:scale-105 transition-all duration-200 ", className)}>
            {!isMenuOpened && (
                <Image 
                    src="/menu.svg"
                    width={35}
                    height={35}
                    alt="menu icon"

                    onClick={()=> setMenuOpened(true)}
                />
            )}
            {isMenuOpened && (
                <Image 
                    src="/cross.svg"
                    width={35}
                    height={35}
                    alt="menu icon"

                    onClick={()=> setMenuOpened(false)}
                />
            )}
        </div>
    );
};