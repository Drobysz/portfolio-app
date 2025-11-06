import styles from "./ContactImage.module.scss";

export const ContactImage = ()=> {
	return (
		<div
			className={styles.contact_image}
			style={{
				backgroundImage: "url(/portfolio.jpeg)",
				backgroundSize: "cover",
			}}
		/>
	)
}