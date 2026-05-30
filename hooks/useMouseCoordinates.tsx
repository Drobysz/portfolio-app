import { useEffect, useState } from "react";

export const useMouseCoordinates = ()=> {
    const [mousePosition, setMousePosition] = useState<{x: number , y: number}>({ x: 0, y: 0 });

    const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            updateMousePosition(e);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return {
        x: mousePosition.x,
        y: mousePosition.y,
    }
}