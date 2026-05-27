import styles from "./EventImage.module.scss";

export const EventImage = ({img}: {img: string})=> {
	return (
		<div 
			className={styles.event_image}
			style={{
				backgroundImage: `url(/history/${img}.png)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		/>
	)
}