import { TypeWriterEffectText, ContainerTextFlip } from "@/components/index";
import skills from "./skills.json";
import cn from "classnames";

export const IntroText = ()=> {
	return (
		<div className="flex flex-col gap-6">
			<TypeWriterEffectText>
				Site of Alexander Drobysz
			</TypeWriterEffectText>
			<div className={cn(
				"flex gap-2",
				"items-center justify-center"
			)}>
				<p className={cn(
					"text-center text-2xl text-transparent",
					"bg-gradient-to-br from-white",
					"to-gray-400 bg-clip-text relative z-20"
				)}>
					I can work with
				</p>
				<ContainerTextFlip 
					words={skills}
				/>
			</div>
		</div> 
	)
}