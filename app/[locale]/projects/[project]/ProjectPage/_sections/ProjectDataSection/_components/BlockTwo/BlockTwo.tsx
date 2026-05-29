import { Project } from "@/interfaces";
import { Stacks, LinkBtns } from "./_components/index";

export const BlockTwo = ({
	project,
}: {
	project: Project,
})=> {
	return (
		<div className="flex flex-col gap-6 w-full">
			<Stacks stacks={project.stacks}/>
			<LinkBtns 
				project_url={project.project_url}
				repository_url={project.repository_url}
				cover_image_url={project.cover_image_url}
			/>
		</div>
	)
}