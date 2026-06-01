"use client";

import { AnimatePresence, motion } from "framer-motion";
import { variantsBackgroundContent } from "../AnimationProps";
import { Project } from "@/interfaces";
import { FullScreenSpin } from "@/components";
import s from "./style.module.scss";

export const ProjectImage = ({
	project
}: {
	project: Project
})=> {
	if (!project) return <FullScreenSpin />;

	return (
		<AnimatePresence>
			<motion.div 
				key={`main_img_${project.slug}`}
				className={s.body}
				style={{
					backgroundImage: `url(${project.project_image_url})`,
					backgroundSize: "cover",
				}}
				variants={variantsBackgroundContent}
				initial="hidden"
				animate="visible"
			/>
		</AnimatePresence>
	)
}