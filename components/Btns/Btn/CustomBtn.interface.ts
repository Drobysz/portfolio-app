import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BtnProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color?: "white" | "ghost";
    size?: "medium" | "small";
    link: string;
};