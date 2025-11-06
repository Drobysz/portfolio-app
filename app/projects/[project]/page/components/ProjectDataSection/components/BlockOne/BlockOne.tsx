import styles from "./BlockOne.module.scss";

interface BlockOneProps {
	date: string;
	description: string;
}

export const BlockOne = ({date, description}: BlockOneProps)=> {
	return (
		<>
			<h2 className={styles.title}>
                {date}
            </h2>
            <p className={styles.description}>
                {description}
            </p>
		</>
	)
}