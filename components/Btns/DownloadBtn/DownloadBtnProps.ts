import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DonwloadBtnProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    duration?: number;
    clockwise?: boolean;
    href: string;
    downloadFileName: string;
};

export enum Direction {
    top, 
    right,
    bottom,
    left
};