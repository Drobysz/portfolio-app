import { motion } from "framer-motion";
import { CursorProps } from "../NavBarProps.interface";

export const Cursor = ({ position }: CursorProps)=> {
    return (
        <motion.span
            animate={{
                ...position,
            }}
            className="absolute z-0 h-9 rounded-4xl bg-white/12"
        />
    );
};