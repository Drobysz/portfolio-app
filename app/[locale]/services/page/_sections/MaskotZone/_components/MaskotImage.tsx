"use client";

import { 
	LevitatingImg 
} from '@/components/animations/LevitatingElement/LevitatingImg';
import { useWindowWidth } from '@/hooks';

export const MaskotImage = ()=> {
	const isDesktop = useWindowWidth(620) as boolean;

	return (
		<LevitatingImg 
			src='/logo.png' 
			width={isDesktop ? 300 : 200} 
			height={isDesktop ? 800: 500} 
			alt='developer logo' 
		/>
	)
}
