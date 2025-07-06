"use client"

import { useEffect, useState } from "react";

export const useWindowWidth = ()=> {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(()=> {
        const onResize = ()=> setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        onResize();

        return ()=> window.removeEventListener("resize", onResize);
    },[]);

    return width;
};