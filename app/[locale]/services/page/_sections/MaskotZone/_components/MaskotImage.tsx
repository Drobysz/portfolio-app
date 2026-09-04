"use client";

import { 
	LevitatingImg 
} from '@/components/animations/LevitatingElement/LevitatingImg';
import { useWindowWidth } from '@/hooks';
import { useTranslations } from 'next-intl';

export const MaskotImage = ()=> {
	const isDesktop = useWindowWidth(620) as boolean;
	const t = useTranslations("Services.mascot");

	return (
		<LevitatingImg 
			src='/logo.png' 
			width={isDesktop ? 300 : 200} 
			height={isDesktop ? 800: 500} 
			alt={t("imageAlt")}
		/>
	)
}
