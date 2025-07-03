import { MotionValue } from "framer-motion";

export interface SMobj {
    title: string;
    link: string;
    img: string;
    mouseX: MotionValue<number>;
};

export interface SMListObj {
    title: string;
    link: string;
    img: string;
};

export interface SMBarProps {
    SMList: SMListObj[];
};