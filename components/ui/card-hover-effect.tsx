"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
    onClick?: () => void;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={item.onClick}
        >
          <motion.div
            className="absolute inset-0 rounded-lg bg-slate-800 dark:bg-slate-700"
            animate={{
              scale: hoveredIndex === idx ? 1.05 : 1,
              opacity: hoveredIndex === idx ? 1 : 0.3,
            }}
            transition={{ duration: 0.2 }}
          />
          <div className="relative z-10 p-5">
            <div className="flex items-center gap-2">
              {item.icon}
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};