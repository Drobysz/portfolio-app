"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./ColorfulSquaresbackground.module.scss";

const CELL_WIDTH = 64;
const CELL_HEIGHT = 32;
const TRAIL_SIZE = 40;
const DESKTOP_MEDIA_QUERY = "(min-width: 601px)";

const COLORS = [
  "#3B82F6",
  "#2563EB",
  "#60A5FA",
  "#818CF8",
  "#6366F1",
  "#4F46E5",
  "#7C3AED",
  "#A78BFA",
  "#C4B5FD",
] as const;

const TRAIL_ITEMS = Array.from({ length: TRAIL_SIZE }, (_, index) => index);

type SquaresCoreProps = HTMLAttributes<HTMLDivElement>;

const getRandomColor = () =>
  COLORS[Math.floor(Math.random() * COLORS.length)];

export const SquaresCore = ({ className, ...rest }: SquaresCoreProps) => {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const trailLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const trailLayer = trailLayerRef.current;

    if (!surface || !trailLayer) return;

    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const trailItems = Array.from(trailLayer.children) as HTMLDivElement[];
    let activeCell = "";
    let nextTrailIndex = 0;

    const resetActiveCell = () => {
      activeCell = "";
    };

    const updateHighlight = (event: PointerEvent) => {
      if (!desktopQuery.matches) return;

      const column = Math.floor(event.offsetX / CELL_WIDTH);
      const row = Math.floor(event.offsetY / CELL_HEIGHT);
      const nextCell = `${column}:${row}`;

      if (nextCell === activeCell) return;

      const trailItem = trailItems[nextTrailIndex];
      const useFirstAnimation = !trailItem.classList.contains(styles.fadeA);

      activeCell = nextCell;
      nextTrailIndex = (nextTrailIndex + 1) % TRAIL_SIZE;

      trailItem.style.backgroundColor = getRandomColor();
      trailItem.style.transform = `translate(${column * CELL_WIDTH}px, ${row * CELL_HEIGHT}px)`;
      trailItem.className = `${styles.trailItem} ${
        useFirstAnimation ? styles.fadeA : styles.fadeB
      }`;
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") resetActiveCell();
    };

    const handleMediaChange = () => {
      if (!desktopQuery.matches) resetActiveCell();
    };

    surface.addEventListener("pointerenter", updateHighlight);
    surface.addEventListener("pointermove", updateHighlight);
    surface.addEventListener("pointerdown", updateHighlight);
    surface.addEventListener("pointerleave", resetActiveCell);
    surface.addEventListener("pointerup", handlePointerEnd);
    surface.addEventListener("pointercancel", resetActiveCell);
    desktopQuery.addEventListener("change", handleMediaChange);

    return () => {
      surface.removeEventListener("pointerenter", updateHighlight);
      surface.removeEventListener("pointermove", updateHighlight);
      surface.removeEventListener("pointerdown", updateHighlight);
      surface.removeEventListener("pointerleave", resetActiveCell);
      surface.removeEventListener("pointerup", handlePointerEnd);
      surface.removeEventListener("pointercancel", resetActiveCell);
      desktopQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        styles.wrapper,
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      <div className={styles.gridAnchor}>
        <div ref={surfaceRef} className={styles.gridSurface}>
          <div ref={trailLayerRef} className={styles.trailLayer}>
            {TRAIL_ITEMS.map((index) => (
              <div key={index} className={styles.trailItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ColorfulSquaresBackground = SquaresCore;
