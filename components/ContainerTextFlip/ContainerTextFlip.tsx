"use client"
import { ContainerTextFlipProps } from "./ContainerTextFlipProps";
import { motion } from "framer-motion";
import React, { useState, useEffect, useId, useRef } from "react";
import cn from "classnames";

export function ContainerTextFlip({
  words = ["test1", "test2", "test3", "test4"],
  interval = 3000,
  duration = 700
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = useRef<HTMLParagraphElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.p
        layout
        layoutId={`words-here-${id}`}
        animate={{ width }}
        transition={{ duration: duration / 2000 }}
        className={cn(
        "relative inline-block rounded-lg py-2 text-center text-xl font-bold text-white",
        "[background:linear-gradient(to_bottom,#374151,#1f2937)]",
        "shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        )}
        key={words[currentWordIndex]}
    >
        <motion.span
            transition={{
                duration: duration / 1000,
                ease: "easeInOut",
            }}
            className="inline-block"
            ref={textRef}
            layoutId={`word-div-${words[currentWordIndex]}-${id}`}
        >
            {words[currentWordIndex].split("").map((symbol, index) => (
                <motion.span
                    key={index}
                    initial={{
                        opacity: 0,
                        filter: "blur(10px)",
                    }}
                    animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        delay: index * 0.02,
                    }}
                >
                    {symbol}
                </motion.span>
            ))}
        </motion.span>
    </motion.p>
  );
}