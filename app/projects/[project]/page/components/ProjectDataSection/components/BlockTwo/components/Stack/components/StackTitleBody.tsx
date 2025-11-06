import { tronecal } from "@/fonts/fonts";
import { ReactNode } from "react";
import cn from "classnames";

export const StackTitleBody = ({children}: {children: ReactNode})=> {
	return (
		<h3 className={cn(
			"w-fit text-white/70 font-bold",
			"text-xl max-[650px]:text-lg",
			"max-[520px]:text-sm"
			, tronecal.className
		)}>
			{children}
		</h3>
	)
}