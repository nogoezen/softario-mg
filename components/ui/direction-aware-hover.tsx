"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export const DirectionAwareHover = ({
  imageUrl,
  title,
  description,
  link,
}: {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}) => {
  const [direction, setDirection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const angle = Math.atan2(mouseY - cardCenterY, mouseX - cardCenterX);
    const sector = (angle * 180) / Math.PI + 180;

    if (sector >= 45 && sector < 135) {
      setDirection("top");
    } else if (sector >= 135 && sector < 225) {
      setDirection("left");
    } else if (sector >= 225 && sector < 315) {
      setDirection("bottom");
    } else {
      setDirection("right");
    }

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDirection(null);
  };

  return (
    <Link href={link}>
      <div
        ref={cardRef}
        className="relative w-full h-64 rounded-lg overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: direction === "top" ? 20 : direction === "bottom" ? -20 : 0, x: direction === "left" ? 20 : direction === "right" ? -20 : 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: direction === "top" ? 20 : direction === "bottom" ? -20 : 0, x: direction === "left" ? 20 : direction === "right" ? -20 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4"
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p>{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};