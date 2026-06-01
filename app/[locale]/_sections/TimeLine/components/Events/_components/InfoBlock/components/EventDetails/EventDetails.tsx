import styles from "./EventDetails.module.scss";

export const EventDetails = ({
	title,
	description
}: {
	title: string, description: string
})=> {
	return (
		<div className="flex flex-col gap-8">
			<h3 className={styles.title}>
				{title}
			</h3>
			<p className={styles.description}>
				{description}
			</p>
		</div>
	)
}
