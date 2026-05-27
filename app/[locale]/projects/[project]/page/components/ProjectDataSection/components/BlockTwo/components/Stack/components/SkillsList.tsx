export const SkillsList = ({list}: {list: string[]})=> {
	return (
		<p className="flex flex-wrap gap-1.5">
			{list.map( (skill: string, idx: number)=> (
				<span 
					className="text-white/40 text-lg font-extrabold italic max-[650px]:text-sm max-[520px]:text-xs" 
					key={`id-${idx}`}
				>
					{skill}{idx+1 === list.length ? "." : ","}
				</span>
			) )}
		</p>
	)
}