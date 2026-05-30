import { useEffect, useState } from "react";

export const useMouseCoordinates = ()=> {
    const [mousePosition, setMousePosition] = useState<{x: number , y: number}>({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrame: number | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            const nextPosition = { x: e.pageX, y: e.pageY };

            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }

            animationFrame = window.requestAnimationFrame(() => {
                setMousePosition(nextPosition);
                animationFrame = null;
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }

            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return {
        x: mousePosition.x,
        y: mousePosition.y,
    }
}
