"use client"

import { useContext } from "react";
import { AppContext } from "@/app/[locale]/context/app.context";
import { bagel_fat_one } from "@/fonts/fonts";
import styles from "./SidebarMenu.module.scss";
import cn from "classnames";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const SidebarMenu = ()=> {
    const { isMenuOpened, setMenuOpened } = useContext(AppContext);
    const t = useTranslations("Layout");
    const tabsList = [
        { href: '/', label: t('nav.0') },
        { href: '/projects', label: t('nav.1') },
        { href: '/resume', label: t('nav.2') },
    ];

    return (
        <aside 
            className={cn(bagel_fat_one.className, {
                [styles.is_opened]: isMenuOpened,
                ["hidden"]: !isMenuOpened
            })}
            style={{
                background: 'linear-gradient( to right, transparent, #0A0A0A 70%)',
            }}
        >
            <ul className={styles.menu_list_section}>
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
