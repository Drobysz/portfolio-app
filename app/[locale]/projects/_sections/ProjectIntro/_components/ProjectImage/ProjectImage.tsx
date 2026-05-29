import { ProjectsContext } from "@/app/[locale]/projects/context/projects.context";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { variantsBackgroundContent } from "../AnimationProps";
import { Project } from "@/interfaces";

export const ProjectImage = ({
	project
}: {
	project: Project
})=> {
	return (
		<AnimatePresence>
			<motion.div 
				key={`main_img_${project.slug}`}
				className="absolute right-0 h-full w-[55%] rounded-md max-[1032px]:h-[80%] max-[800px]:h-[50%]"
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