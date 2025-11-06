import { CustomBtn, LinkImageBtn } from "@/components/index";
import { ProjectDataProps } from "../../../ProjectDataSection.interface";
import cn from "classnames";

export const LinkBtns = ({ 
	projectData,
	img
}: {
	projectData: ProjectDataProps,
	img: string,
})=> {
	return (
		<div className={cn(
			"grid grid-cols-2",
			"h-full gap-4 grid",
		)}>
			<LinkImageBtn img={`/GH_links/${img}.png`}>
				<CustomBtn
					className="w-full h-full"
					size="medium"
					color="white"
					link={projectData.GH_link}
				> 
					GitHub
				</CustomBtn>
			</LinkImageBtn>
			<LinkImageBtn img={`/project_images/${img}.png`}>
				<CustomBtn 
					className="w-full"
					size="medium"
					color="ghost"
					link={projectData.site_link}
				> 
					site
				</CustomBtn>
			</LinkImageBtn>
		</div>
	);
};