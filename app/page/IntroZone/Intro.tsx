import { Shadow, IntroText } from "./components/index";
import { ColorfulSquaresBackground } from "@/components/index";
import cn from "classnames";

export const Intro = ()=> {
	return (
		<section className={cn(
			"h-[90vh] relative w-full overflow-hidden",
			"bg-[#0a0a0a] flex flex-col items-center",
			"justify-center rounded-4xl mb-20"
		)}>
			<Shadow />
			<ColorfulSquaresBackground />
			<IntroText />
		</section>
	)
}