import { AppContext } from "@/app/context/app.context";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { Tabprops } from "@/components/NavBar/NavBarProps.interface";
import styles from "./Tab.module.scss";

export const Tab = ({
    children, isActive, href,
    setPosition, setPositionClicked
}: Tabprops)=> {
    const ref = useRef<HTMLSpanElement>(null!);
    const { isVisible } = useContext(AppContext);

    const handleInteraction = (action: "hover" | "click")=> {
        const { offsetLeft: left, offsetWidth: width } = ref.current;
        const pos = { left, width };

        switch (action) {
            case "hover":
                setPosition(pos);
                break;
        
            case "click":
                setPositionClicked(pos);
                break;
        };
    };

    useEffect(()=> {
        if (isActive){
            handleInteraction("hover");
            handleInteraction("click");
        };
    }, [isVisible]);

    return (
        <Link
            href={href} 
            className="z-20"
        >
            <span 
                className={styles.sm_text}
                ref={ref}
                onMouseEnter={()=> handleInteraction("hover")}
                onClick={()=> handleInteraction("click")}
            >
                {children}
            </span>
        </Link>
    );
};