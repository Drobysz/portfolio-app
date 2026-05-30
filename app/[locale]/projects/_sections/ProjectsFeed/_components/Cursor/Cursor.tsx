import { motion } from "framer-motion";
import { CursorPosition } from "./Cursor.props";


export const Cursor = ({ position }: CursorPosition)=> {
    return (
        <motion.div 
            className="absolute bg-neutral-400 rounded-3xl p-2" 
            animate={{
                ...position
            }}
        />
    );
};