"use client";

import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import s from "./style.module.scss";
import { useMouseCoordinates } from "@/hooks";

export const MouseGuide = ()=> {
    const {
        mouseText
    } = useContext(AppContext);
    const {x, y} = useMouseCoordinates();

    if (!mouseText) return null;

    return (
        <div 
            className={s.body}
            style={{
                left: x,
                top: y + 160
            }}
        >
            {mouseText}
        </div>
    )
}