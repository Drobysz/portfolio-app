"use client"

import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import { bagel_fat_one } from "@/fonts/fonts";
import styles from "./SidebarMenu.module.scss";
import cn from "classnames";
import Link from "next/link";

export const SidebarMenu = ()=> {
    const { isMenuOpened, setMenuOpened } = useContext(AppContext);
    // List of tabs
    const tabsList = [
        { href: '/', label: 'History' },
        { href: '/projects', label: 'Projects' },
        { href: '/resume', label: 'Resumé' },
    ];

    return (
        <aside 
            className={cn(bagel_fat_one.className, {
                ["fixed inset-0 z-30 h-[100vh] w-[100vw] flex flex-col items-end justify-center p-7 text-white text-6xl max-[670px]:text-5xl max-[670px]:p-5 max-[520px]:text-4xl max-[520px]:p-3"]: isMenuOpened,
                ["hidden"]: !isMenuOpened
            })}
            style={{
                background: 'linear-gradient( to right, transparent, #0A0A0A 70%)',
            }}
        >
            <ul className="flex flex-col gap-10 max-[670px]:gap-8 max-[520px]:gap-6 pr-8 max-[670px]:pr-5 max-[520px]:pr-3">
                {tabsList.map((tab, idx)=> (
                    <Link
                        key={`tab_id_${idx}`}
                        href={tab.href}
                        className={styles.hoverText}
                        onClick={()=> setMenuOpened(false)}
                    >
                        <li>
                            {tab.label}
                        </li>
                    </Link>
                ))}
            </ul>
            
        </aside>
    );
};