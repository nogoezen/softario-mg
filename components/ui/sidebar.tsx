"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";

type SidebarProps = {
  items: {
    name: string;
    icon: LucideIcon;
    view: string;
  }[];
  onItemClick: (item: { name: string; icon: LucideIcon; view: string }) => void;
  activeItem: string;
};

export const Sidebar = ({ items, onItemClick, activeItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 relative ${
        isOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isOpen ? "16rem" : "5rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 z-10"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, idx) => (
              <motion.button
                key={idx}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeItem === item.view
                    ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => onItemClick(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <div className="flex flex-col items-center space-y-4 mt-4">
          {items.map((item, idx) => (
            <motion.button
              key={idx}
              className={`p-2 rounded-lg transition-colors ${
                activeItem === item.view
                  ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => onItemClick(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};