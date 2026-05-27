import data from "@/data_json/timeline_data.json";
import { DateTitle, InfoBlock } from "./components/index";
import styles from "./Events.module.scss";
import { useTranslations } from "next-intl";

export const Events = ()=> {
	const t = useTranslations("Home.timeline.items");

	return (
		<div className={styles.event_section}>
			{data.map((timeBlock, index)=> (
				<div
					key={`id-${index}`}
					className="relative grid grid-cols-2 h-[200px]"
				>
					<DateTitle date={t(`${index}.date`)}/>
					<InfoBlock 
						title={t(`${index}.title`)}
						description={t(`${index}.description`)}
						img={timeBlock.img}
					/>
				</div>
			))}
		</div>
	)
}
