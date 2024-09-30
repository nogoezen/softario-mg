'use client';

import { useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { UserProfile } from './UserProfile';
import { SettingsComponent } from './SettingsComponent';
import { ProductList } from './ProductList';
import { Menu, X, User, Settings, ShoppingBag, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function DashboardWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Barre latérale */}
      <aside className={`bg-white dark:bg-gray-800 w-64 min-h-screen p-4 transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-30`}>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('dashboard')}>
            <Home className="mr-2 h-4 w-4" /> Accueil
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('products')}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Produits
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('profile')}>
            <User className="mr-2 h-4 w-4" /> Profil
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('settings')}>
            <Settings className="mr-2 h-4 w-4" /> Paramètres
          </Button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* En-tête */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <Button variant="ghost" onClick={toggleSidebar} className="md:hidden">
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
          <h1 className="text-xl font-bold">Tableau de bord</h1>
          <LogoutButton />
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-700 p-6">
          <div className="container mx-auto">
            {currentView === 'dashboard' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Bienvenue sur votre tableau de bord !</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Ici, vous pouvez gérer vos produits, voir vos commandes et accéder à tous les outils dont vous avez besoin.
                </p>
              </div>
            )}
            {currentView === 'products' && <ProductList />}
            {currentView === 'profile' && <UserProfile />}
            {currentView === 'settings' && <SettingsComponent />}
          </div>
        </main>
      </div>
    </div>
  );
}