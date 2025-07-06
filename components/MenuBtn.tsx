"use client"

import { useWindowWidth } from "@/hooks/indexHooks";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AppContext } from "@/app/context/AppContext";
import cn from "classnames";

export const MenuBtn = ({className}: {className: string})=> {
    const width = useWindowWidth();
    const { isMenuOpened, setMenuOpened } = useContext(AppContext);

    useEffect(()=> {
        if (width > 770)
            setMenuOpened(false);
    },[width]);

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