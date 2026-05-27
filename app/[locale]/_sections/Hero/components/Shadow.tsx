import cn from "classnames";

export const Shadow = ()=> {
	return (
		 <div className={cn(
			"absolute inset-0 w-full h-full z-20",
			"bg-radial from-transparent",
			"via-[#0a0a0a]/20 via-30%",
			"to-[#0a0a0a]/98 to-75%",
			"inset-shadow-3xl pointer-events-none"
		)}/>
	)
}