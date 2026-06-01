import { GlowingEffect } from "@/components/animations/GlowingEffect";
import { ReactNode } from "react";
import s from "./style.module.scss";

export const StackBody = ({children}: {children: ReactNode})=> {
	return (
		<GlowingEffect
            disabled={false}
            spread={80} 
            glow
            className={s.body}
		>
			{children}
		</GlowingEffect>
	)
}
