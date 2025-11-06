import { DownloadBtn } from "@/components/index";
import cn from "classnames";

export const DownloadBntSample = ({mode}: {mode: 'mobile' | 'desktop'})=> {
	return (
		<DownloadBtn
			className={cn({
				['max-[850px]:hidden']: mode == 'desktop',
				['hidden max-[850px]:block']: mode == 'mobile',
			})}
			href="/resume/CV_Drobysz.pdf"
			downloadFileName="Drobyshevski_CV"
		>
			Download CV
		</DownloadBtn>
	)
}