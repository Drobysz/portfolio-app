"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import cn from 'classnames';
import { useWindowWidth } from "@/hooks/useWindowWidth";

const getGridSize = (width: number) => {
  if (width <= 360) return { rowsCount: 34, colsCount: 24 };
  if (width <= 480) return { rowsCount: 42, colsCount: 30 };
  if (width <= 600) return { rowsCount: 54, colsCount: 38 };
  if (width <= 900) return { rowsCount: 80, colsCount: 58 };
  if (width <= 1200) return { rowsCount: 110, colsCount: 78 };
  return { rowsCount: 150, colsCount: 100 };
};

export const SquaresCore = ({ className, ...rest }: { className?: string }) => {
  const width = useWindowWidth();
  const { rowsCount, colsCount } = getGridSize(width);
  const rows = useMemo(() => new Array(rowsCount).fill(1), [rowsCount]);
  const cols = useMemo(() => new Array(colsCount).fill(1), [colsCount]);
  const isInteractive = width > 600;
  const colors = [
    "#3B82F6", 
    "#2563EB", 
    "#60A5FA", 
    "#818CF8", 
    "#6366F1", 
    "#4F46E5", 
    "#7C3AED", 
    "#A78BFA", 
    "#C4B5FD", 
  ];

  const cubeColor = {
    backgroundColor: `${getRandomColor()}`,
    transition: { duration: 0 },
  };
  function getRandomColor () {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-slate-700"
        >
          {cols.map((_, j) => (
              <motion.div
	              {...(isInteractive
	                ? {
	                  whileHover: cubeColor,
	                  whileTap: cubeColor,
	                }
	                : {})}
	              animate={{
	                transition: { duration: 2 },
	              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-700"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const ColorfulSquaresBackground = React.memo(SquaresCore);
