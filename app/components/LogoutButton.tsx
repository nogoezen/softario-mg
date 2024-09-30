'use client';

import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/'); // Redirigez vers la page d'accueil après la déconnexion
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      <LogOut className="w-4 h-4 mr-2" />
      Déconnexion
    </Button>
  );
}