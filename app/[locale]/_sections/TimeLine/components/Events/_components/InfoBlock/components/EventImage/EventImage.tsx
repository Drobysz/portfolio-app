import Image from "next/image";
import styles from "./EventImage.module.scss";

export const EventImage = ({img}: {img: string})=> {
	return (
		<div className={styles.event_image}>
			<Image
				src={`/history/${img}.png`}
				alt=""
				fill
				sizes="(max-width: 390px) 50vw, (max-width: 600px) 50vw, (max-width: 900px) 40vw, 480px"
				className={styles.event_image_asset}
			/>
		</div>
	)
}
