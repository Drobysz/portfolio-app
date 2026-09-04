import { bagel_fat_one, press2p } from '@/fonts/fonts';
import cn from 'classnames';

export const MaskotText = ()=> {
	return (
		<p className={cn(
			"text-center text-white text-sm",
			"max-w-175",
			"max-[820px]:text-sm max-[820px]:max-w-100",
			"max-[620px]:text-xs",
			"max-[420px]:text-[0.5rem]",
			press2p.className
		)}>
			Our family tree of Polish nobility has included many talented individuals in various fields, ranging from the military to politics, and from business to agriculture. Now, the Drobysz Dynasty is entering the digital realm of web development.
		</p>
	)
}