import { CustomBtn, LinkImageBtn } from "@/components/index";
import cn from "classnames";

export const LinkBtns = ({ 
	project_url,
	repository_url,
	project_image_url
}: {
	project_url: string | null;
  	repository_url: string | null;
	project_image_url: string | null;
})=> {
	return (
		<div className={cn(
			"grid grid-cols-2",
			"h-full gap-4 grid",
		)}>
			{repository_url && 
				<LinkImageBtn img={`/GH_links/ewenli.png`}>
					<CustomBtn
						className="w-full h-full"
						size="medium"
						color="white"
						link={repository_url}
					> 
						GitHub
					</CustomBtn>
				</LinkImageBtn>
			}
			{project_url &&
				<LinkImageBtn img={project_image_url ?? ""}>
					<CustomBtn 
						className="w-full"
						size="medium"
						color="ghost"
						link={project_url}
					> 
						site
					</CustomBtn>
				</LinkImageBtn>
			}
		</div>
	);
};