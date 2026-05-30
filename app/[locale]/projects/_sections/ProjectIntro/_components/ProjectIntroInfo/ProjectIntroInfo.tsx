import { AnimatePresence, motion } from "framer-motion"
import { variantsTextContent } from "../AnimationProps";
import { avenir, bagel_fat_one } from "@/fonts/fonts";
import cn from "classnames";
import { CustomBtn, FullScreenSpin } from "@/components/index";
import styles from "./ProjectIntroInfo.module.scss";
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
					className={styles.proj_info_dection}
					variants={variantsTextContent}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<h2 className={cn(
						styles.title,
						bagel_fat_one.className
					)}>
						{title}
					</h2>
					<p className={cn(
						styles.description,
						avenir.className
					)}>
						{short_description}
					</p>
					<CustomBtn
						color="white"
						link={`/projects/${slug}`}
					>
						Learn more
					</CustomBtn>
				</motion.div> 
			)}
		</AnimatePresence>
	)
}