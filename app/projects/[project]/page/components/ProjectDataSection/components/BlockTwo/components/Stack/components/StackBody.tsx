import { GlowingEffect } from "@/components/index";
import { ReactNode } from "react";
import cn from "classnames";

export const StackBody = ({children}: {children: ReactNode})=> {
	return (
		<GlowingEffect
            disabled={false}
            spread={80} 
            glow
            className={cn(
			"col-span-2 flex flex-col",
			"place-content-center gap-4",
			"p-8 backdrop-blur-xl rounded-xl",
			"border-2 bg-zinc-900/40",
			"border-zinc-700 perspective-distant",
			"max-[650px]:gap-5"
		)}>
			{children}
		</GlowingEffect>
	)
}