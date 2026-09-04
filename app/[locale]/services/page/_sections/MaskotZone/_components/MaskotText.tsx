import { press2p } from '@/fonts/fonts';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

export const MaskotText = ()=> {
	const t = useTranslations("Services.mascot");

	return (
		<p className={cn(
			"text-center text-white text-sm",
			"max-w-175",
			"max-[820px]:text-sm max-[820px]:max-w-100",
			"max-[620px]:text-xs",
			"max-[420px]:text-[0.5rem]",
			press2p.className
		)}>
			{t("description")}
		</p>
	)
}
