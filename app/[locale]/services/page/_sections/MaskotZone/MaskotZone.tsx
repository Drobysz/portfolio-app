import cn from 'classnames';
import { MaskotImage, MaskotText } from "./_components/index";

export const MaskotZone = ()=> {
	return (
		<div className={cn(
			"h-fit z-20 w-full",
			"flex flex-col gap-6 pb-30",
			"justify-center items-center",
			"max-[820px]:gap-16 max-[620px]:gap-8"
		)}>
			<MaskotImage />
			<MaskotText />
		</div>
	)
}