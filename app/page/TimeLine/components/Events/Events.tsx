import data from "@/data_json/timeline_data.json";
import { DateTitle, InfoBlock } from "./components/index";
import styles from "./Events.module.scss";

export const Events = ()=> {
	return (
		<div className={styles.event_section}>
			{data.map((timeBlock, index)=> (
				<div
					key={`id-${index}`}
					className="relative grid grid-cols-2 h-[200px]"
				>
					<DateTitle date={timeBlock.date}/>
					<InfoBlock 
						title={timeBlock.title}
						description={timeBlock.description}
						img={timeBlock.img}
					/>
				</div>
			))}
		</div>
	)
}