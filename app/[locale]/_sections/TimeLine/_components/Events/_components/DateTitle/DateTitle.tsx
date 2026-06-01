import styles from "./DateTitle.module.scss";

export const DateTitle = ({date}: {date: string})=> {
    return (
        <div>
            <div className={styles.date_title_section}>
                <div className={styles.timeline_ring}/>
                <h2 className={styles.date_title}>
                    {date}
                </h2>
            </div>    
        </div>
    );
};