import { ProjectsContext } from "@/app/projects/context/projects.context";
import { AnimatePresence, motion } from "framer-motion"
import { useContext } from "react";
import { variantsTextContent } from "./../AnimationProps";
import { avenir, bagel_fat_one } from "@/fonts/fonts";
import cn from "classnames";
import { CustomBtn } from "@/components/index";
import styles from "./ProjectIntroInfo.module.scss";

export const ProjectIntroInfo = ()=> {
	const { project } = useContext(ProjectsContext);
	const { 
		title,
		description,
		pagename,
	} = project;

	return (
		<AnimatePresence initial={false} mode="wait">
			{ project && ( 
				<motion.div 
					key={project.pagename}
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
						{description}
					</p>
					<CustomBtn
						color="white"
						link={`/projects/${pagename}`}
					>
						Learn more
					</CustomBtn>
				</motion.div> 
			)}
		</AnimatePresence>
	)
}