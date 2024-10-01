'use client';

import { useState } from 'react';
import { LogoutButton } from '@/app/components/front/LogoutButton';
import { UserProfile } from '@/app/components/dashboard/UserProfile';
import { SettingsComponent } from '@/app/components/dashboard/SettingsComponent';
import { User, Settings, Home, BarChart2, ShoppingBag, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Sidebar } from "@/components/ui/sidebar";

export function DashboardWrapper() {
  const [currentView, setCurrentView] = useState('dashboard');

  const navItems = [
    { name: "Accueil", icon: Home, view: "dashboard" },
    { name: "Statistiques", icon: BarChart2, view: "stats" },
    { name: "Produits", icon: ShoppingBag, view: "products" },
    { name: "Profil", icon: User, view: "profile" },
    { name: "Paramètres", icon: Settings, view: "settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Barre latérale */}
      <Sidebar 
        items={navItems}
        onItemClick={(item: { name: string; icon: LucideIcon; view: string }) => setCurrentView(item.view)}
        activeItem={currentView}
      />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* En-tête */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <TextGenerateEffect words={`Tableau de bord - ${navItems.find(item => item.view === currentView)?.name}`} className="text-xl font-bold" />
          <LogoutButton />
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <div className="container mx-auto">
            {currentView === 'dashboard' && (
              <BackgroundGradient className="rounded-[22px] p-6 sm:p-10 bg-white dark:bg-gray-800">
                <h2 className="text-3xl font-semibold mb-6">Bienvenue sur votre tableau de bord !</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ici, vous pouvez gérer votre profil, accéder aux statistiques, et gérer vos produits.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {navItems.slice(1).map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center text-lg"
                      onClick={() => setCurrentView(item.view)}
                    >
                      <item.icon className="h-6 w-6 mb-2" />
                      <span>{item.name}</span>
                    </Button>
                  ))}
                </div>
              </BackgroundGradient>
            )}
            {currentView === 'profile' && <UserProfile />}
            {currentView === 'settings' && <SettingsComponent />}
            {currentView === 'stats' && <div>Statistiques (à implémenter)</div>}
            {currentView === 'products' && <div>Gestion des produits (à implémenter)</div>}
          </div>
        </main>
      </div>
    </div>
  );
}