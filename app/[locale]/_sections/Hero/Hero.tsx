import { Shadow, Title } from "./components/index";
import { ColorfulSquaresBackground } from "@/components/animations/ColorfulSquaresbackground";
import cn from "classnames";

export const Hero = ()=> {
	return (
		<section className={cn(
			"h-[90vh] relative w-full overflow-hidden",
			"bg-[#0a0a0a] flex flex-col items-center",
			"justify-center rounded-4xl mb-20"
		)}>
			<Shadow />
			<ColorfulSquaresBackground />
			<Title />
		</section>
	)
}
