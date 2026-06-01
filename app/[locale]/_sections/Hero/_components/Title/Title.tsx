import { ContainerTextFlip } from "@/components/index";
import { TypeWriterEffectText } from "@/components/animations/TypeWriterEffectText";
import skills from "./skills.json";
import cn from "classnames";
import { useTranslations } from "next-intl";

export const Title = ()=> {
	const t = useTranslations("Home.hero");
	const words = skills.map((_, index)=> t(`skills.${index}`));

	return (
		<div className="flex flex-col gap-6">
			<TypeWriterEffectText>
				{t("title")}
			</TypeWriterEffectText>
			<div className={cn(
				"flex gap-2",
				"items-center justify-center",
				"max-[380px]:flex-col"
			)}>
				<p className={cn(
					"text-center text-2xl text-transparent",
					"bg-linear-to-br from-white",
					"to-gray-400 bg-clip-text relative z-20"
				)}>
					{t("subtitle")}
				</p>
				<ContainerTextFlip 
					words={words}
				/>
			</div>
		</div> 
	)
}
