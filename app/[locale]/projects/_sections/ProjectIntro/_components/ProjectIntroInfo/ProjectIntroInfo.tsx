import { AnimatePresence, motion } from "framer-motion"
import { variantsTextContent } from "../AnimationProps";
import { avenir, bagel_fat_one } from "@/fonts/fonts";
import cn from "classnames";
import { CustomBtn, FullScreenSpin } from "@/components/index";
import s from "./ProjectIntroInfo.module.scss";
import { Project } from "@/interfaces";

export const ProjectIntroInfo = ({
	project
}: {
	project: Project
})=> {
	if (!project) return <FullScreenSpin />

	const { 
		title,
		short_description,
		slug,
	} = project;

	return (
		<AnimatePresence initial={false} mode="wait">
			{ project && ( 
				<motion.div 
					key={`intro-${project.slug}`}
					className={s.proj_info_section}
					variants={variantsTextContent}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<h2 className={cn(
						s.title,
						bagel_fat_one.className
					)}>
						{title}
					</h2>
					<p className={cn(
						s.description,
						avenir.className
					)}>
						{short_description}
					</p>
					<CustomBtn
						color="white"
						link={`/projects/${slug}`}
						className={s.btn}
					>
						Learn more
					</CustomBtn>
				</motion.div> 
			)}
		</AnimatePresence>
	)
}