import { Shadow, Title } from "./_components/index";
import { ColorfulSquaresBackground } from "@/components/animations/ColorfulSquaresbackground";
import cn from "classnames";
import s from "./style.module.scss";

export const Hero = ()=> {
	return (
		<section className={s.body}>
			<Shadow />
			<ColorfulSquaresBackground 
				className={s.background} 
			/>
			<Title />
		</section>
	)
}
