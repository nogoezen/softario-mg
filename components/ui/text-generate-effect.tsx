"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  return (
    <motion.div ref={scope} className={className}>
      {wordsArray.map((word, idx) => {
        return (
          <motion.span
            key={`${word}-${idx}`}
            className="opacity-0 inline-block"
          >
            {word}&nbsp;
          </motion.span>
        );
      })}
    </motion.div>
  );
};