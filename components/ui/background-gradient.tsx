import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const animationClass = animate
    ? "animate-gradient-xy"
    : "";

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500",
          animationClass
        )}
      />
      <div
        className={cn(
          "relative bg-black rounded-[6px] p-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};