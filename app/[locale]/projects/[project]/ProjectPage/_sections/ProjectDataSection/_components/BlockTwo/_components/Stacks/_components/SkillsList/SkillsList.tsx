import s from "./style.module.scss";

export const SkillsList = ({list}: {list: string[]})=> {
	return (
		<p className="flex flex-wrap gap-1.5">
			{list.map( (skill: string, idx: number)=> (
				<span 
					className={s.skill_list}
					key={`id-${idx}`}
				>
					{skill}{idx+1 === list.length ? "." : ","}
				</span>
			) )}
		</p>
	)
}