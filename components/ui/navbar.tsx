"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const Navbar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 z-30 transition-all">
      <div className="flex items-center justify-between px-4 md:px-6 h-full max-w-7xl mx-auto">
        {children}
      </div>
    </nav>
  );
};

export const NavbarItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="relative items-center flex space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
    >
      <span className="block">{children}</span>
    </Link>
  );
};

export const NavbarItems = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
      {children}
    </div>
  );
};

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/logo.png" alt="Logo" width={32} height={32} />
      <span className="font-bold text-xl">Your Logo</span>
    </Link>
  );
};