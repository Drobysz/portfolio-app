import { ProjectDataProps } from "../../ProjectDataSection.interface";
import { Stack, LinkBtns } from "./components/index";

export const BlockTwo = ({
	projectData,
	img
}: {
	projectData: ProjectDataProps,
	img: string
})=> {
	return (
		<div className="flex flex-col gap-6 w-full">
			<Stack projectData={projectData}/>
			<LinkBtns 
				projectData={projectData}
				img={img}
			/>
		</div>
	)
}