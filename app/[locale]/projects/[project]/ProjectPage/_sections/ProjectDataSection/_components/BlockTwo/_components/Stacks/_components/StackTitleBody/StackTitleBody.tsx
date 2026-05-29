import { tronecal } from "@/fonts/fonts";
import { ReactNode } from "react";
import cn from "classnames";
import s from "./style.module.scss";

export const StackTitleBody = ({children}: {children: ReactNode})=> {
	return (
		<h3 className={cn(
			s.title, 
			tronecal.className
		)}>
			{children}
		</h3>
	)
}