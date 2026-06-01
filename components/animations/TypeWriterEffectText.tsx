'use client'

import { motion, useAnimate, useInView, stagger } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";

interface TypewriterType extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    children: string;
};

export const TypeWriterEffectText = ({ children }: TypewriterType) => {

  const wordsArray = children.split(" ");
 
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);
 
  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.split("").map((char, index) => (
                <motion.span
                  key={`char-${index}`}
                  className="text-white opacity-0 hidden"
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className="z-20 text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center"
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500"
      />
    </div>
  );
};