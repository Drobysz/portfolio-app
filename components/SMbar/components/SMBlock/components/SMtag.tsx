import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames";

export const SMtag = ({title}: {title: string})=> {
	return (
		<AnimatePresence>
			<motion.p
				className={cn(
					"absolute z-10 -top-8 left-2.5 w-fit",
					"rounded-md border border-neutral-900",
					"text-neutral-400 text-xs",
					"p-1.5 bg-neutral-800"
				)}

				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 2 }}
			>
				{title}
			</motion.p>
		</AnimatePresence>
	)
}