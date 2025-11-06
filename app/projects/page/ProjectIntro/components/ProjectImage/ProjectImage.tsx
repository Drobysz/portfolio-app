import { ProjectsContext } from "@/app/projects/context/projects.context";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { variantsBackgroundContent } from "./../AnimationProps";

export const ProjectImage = ()=> {
	const { project } = useContext(ProjectsContext);
	const { img } = project;

	return (
		<AnimatePresence>
			<motion.div 
				key={project.pagename}
				className="absolute right-0 h-full w-[55%] rounded-md max-[1032px]:h-[80%] max-[800px]:h-[50%]"
				style={{
					backgroundImage: `url(/project_images/${img}.png)`,
					backgroundSize: "cover",
				}}
				variants={variantsBackgroundContent}
				initial="hidden"
				animate="visible"
			/>
		</AnimatePresence>
	)
}