'use client'

import { CursorPosition, CursorProps, Tabprops } from "./NavBarProps.interface";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import { AppContext } from "@/app/context/AppContext";

type NavbarType = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Navbar = ({className}: NavbarType)=>{
    const pathname = usePathname();

    // Position when tab is being hovered
    const [position, setPosition] = useState<CursorPosition>({
        left: 0,
        width: 0,
    });

    // Position when tab was clicked
    const [positionClicked, setPositionClicked] = useState<CursorPosition>({
        left: 0,
        width: 0,
    });

    // List of tabs
    const tabsList = [
        { href: '/', label: 'History' },
        { href: '/projects', label: 'Projects' },
        { href: '/resume', label: 'Resumé' },
    ];

    return (
        <nav 
            className={cn("h-full relative flex gap-4 items-center", className)}
            onMouseLeave={()=> setPosition(positionClicked)}
        >
            { tabsList.map(tab=> (
                <Tab
                    key={"id_" + tab.label}
                    isActive={pathname === tab.href}
                    setPosition={setPosition}
                    setPositionClicked={setPositionClicked}
                    href={tab.href}
                >
                    {tab.label}
                </Tab>
            ))}

            <Cursor position={position}/>
        </nav>
    );
};

const Tab = ({children, isActive, href, setPosition, setPositionClicked}: Tabprops)=> {
    const ref = useRef<HTMLSpanElement>(null!);
    const { isVisible } = useContext(AppContext);

    useEffect(()=> {
        if (isActive){
            const { offsetLeft: left, offsetWidth: width } = ref.current;

            setPosition({
                left,
                width
            });

            setPositionClicked({
                left,
                width
            });
        };
    }, [isVisible]);

    const handleInteraction = (action: "hover" | "click")=> {
        const { offsetLeft: left, offsetWidth: width } = ref.current;

        switch (action) {
            case "hover":
                setPosition({
                    left,
                    width
                });

                break;
        
            case "click":
                setPositionClicked({
                    left,
                    width
                });

                break;
        };
    };

    return (
        <Link 
            href={href} 
            className="z-20"
        >
            <span 
                className="cursor-pointer px-4 text-neutral-300 duration-200 hover:text-zinc-500 transition text-xl"
                ref={ref}
                onMouseEnter={()=> handleInteraction("hover")}
                onClick={()=> handleInteraction("click")}
            >
                {children}
            </span>
        </Link>
    );
};

const Cursor = ({ position }: CursorProps)=> {
    return (
        <motion.span
            animate={{
                ...position,
            }}
            className="absolute z-0 h-9 rounded-4xl bg-white/12"
        />
    );
};