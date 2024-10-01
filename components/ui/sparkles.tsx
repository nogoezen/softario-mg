"use client";
import React, { useRef, useEffect, useState } from "react";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  particleImage?: string;
  particleShape?: "circle" | "square" | "triangle";
  particleSpeed?: number;
  particleBlendMode?: string;
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    id,
    background,
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 100,
    className,
    particleColor = "#FFF",
    particleImage,
    particleShape = "circle",
    particleSpeed = 1,
    particleBlendMode = "normal",
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setParticles(createParticles());
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const createParticles = () => {
    if (!canvasRef.current) return [];

    const { width, height } = canvasRef.current;
    return Array.from({ length: particleDensity }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * particleSpeed,
      speedY: (Math.random() - 0.5) * particleSpeed,
    }));
  };

  useEffect(() => {
    if (!context) return;

    const animate = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > context.canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > context.canvas.height) {
          particle.speedY = -particle.speedY;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particleColor;
        context.globalCompositeOperation = particleBlendMode as GlobalCompositeOperation;
        context.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [context, particles, particleColor, particleBlendMode]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background: background || "transparent",
      }}
    />
  );
};