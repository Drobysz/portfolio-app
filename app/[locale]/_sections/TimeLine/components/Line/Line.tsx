import { MotionValue, motion } from "framer-motion";
import styles from "./Line.module.scss";

export const Line = ({
    scaleY,
    background
}: {
    scaleY: MotionValue<number>;
    background: MotionValue<string>;
})=> {
    return (
        <motion.div 
            className={styles.colorful_line}
            style={{
                scaleY: scaleY,
                background: background
            }}
        >
            <motion.div className={styles.line_shadow} />
        </motion.div>
    );
};