"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Item {
  quote: string;
  name: string;
  title: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}: {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [duplicatedItems, setDuplicatedItems] = useState<Item[]>([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (items.length > 0 && containerWidth > 0) {
      setDuplicatedItems([...items, ...items]);
    }
  }, [items, containerWidth]);

  const baseVelocity = direction === "left" ? 1 : -1;
  const velocityMultiplier = speed === "fast" ? 2 : speed === "slow" ? 0.5 : 1;

  const x = useMotionValue(0);
  const smoothVelocity = useSpring(useMotionValue(baseVelocity * velocityMultiplier), {
    damping: 50,
    stiffness: 400,
  });

  const translateX = useTransform(x, (value) => `${value}px`);

  useAnimationFrame((time, delta) => {
    if (!pauseOnHover || (containerRef.current && !containerRef.current.matches(":hover"))) {
      x.set(x.get() + smoothVelocity.get() * (delta / 16));

      if (x.get() < -containerWidth) {
        x.set(0);
      }
      if (x.get() > 0) {
        x.set(-containerWidth);
      }
    }
  });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div style={{ x: translateX }} className="flex gap-4 py-4">
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[350px] max-w-full relative rounded-2xl border border-slate-700 px-8 py-6 md:w-[450px]"
          >
            <p className="text-slate-100 font-semibold">{item.quote}</p>
            <div className="mt-4">
              <p className="text-slate-500 font-medium">{item.name}</p>
              <p className="text-slate-400 text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};