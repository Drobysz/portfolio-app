import s from "./style.module.scss";

interface BlockOneProps {
	period: string;
	description: string;
}

export const BlockOne = ({period, description}: BlockOneProps)=> {
	return (
		<>
			<h2 className={s.title}>
                {period}
            </h2>
            <p className={s.description}>
                {description}
            </p>
		</>
	)
}