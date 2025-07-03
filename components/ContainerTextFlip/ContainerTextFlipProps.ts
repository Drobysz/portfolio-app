import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ContainerTextFlipProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
    words?: string[],
    interval?: number,
    duration?: number
};