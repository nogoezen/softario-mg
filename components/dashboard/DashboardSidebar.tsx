'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Users,
  Settings,
  Menu,
  X
} from "lucide-react";

const menuItems = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Produits", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Modération des commentaires", href: "/dashboard/comment-moderation", icon: MessageSquare },
  { name: "Utilisateurs", href: "/dashboard/users", icon: Users },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={cn(
      "h-full border-r bg-gray-100/40 dark:bg-gray-800/40 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {!isCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold">Tableau de bord</h2>}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                  pathname === item.href ? "bg-gray-200 dark:bg-gray-700" : "transparent",
                  "transition-all group"
                )}
              >
                <item.icon className={cn(
                  "h-6 w-6",
                  pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
                )} />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}