"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export const BackgroundBeams = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const beamRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const moveBeam = async () => {
      if (beamRef.current) {
        const { x, y } = mousePosition;
        const beamX = x - beamRef.current.offsetWidth / 2;
        const beamY = y - beamRef.current.offsetHeight / 2;

        await controls.start({
          x: beamX,
          y: beamY,
          transition: { type: "spring", damping: 30, stiffness: 300 },
        });
      }
    };

    moveBeam();
  }, [mousePosition, controls]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        ref={beamRef}
        className="absolute w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-50"
        animate={controls}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};