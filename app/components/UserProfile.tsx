'use client';

import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Models } from 'appwrite';
import { ID } from 'appwrite';

export function UserProfile() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        setName(currentUser.name);
        setEmail(currentUser.email);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        setError('Impossible de récupérer les informations de l\'utilisateur');
      }
    };

    fetchUser();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await account.updateName(name);
      if (password) {
        await account.updatePassword(password);
      }
      setSuccess('Profil mis à jour avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setError(error.message || 'Une erreur est survenue lors de la mise à jour du profil');
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        await account.deleteSession('current');
        await account.deleteSessions();
        await account.deleteIdentity(ID.unique());
        window.location.href = '/'; // Redirection vers la page d'accueil après suppression
      } catch (error: any) {
        console.error('Erreur lors de la suppression du compte:', error);
        setError(error.message || 'Une erreur est survenue lors de la suppression du compte');
      }
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profil Utilisateur</h2>
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      {success && <div className="text-green-500 text-sm font-medium">{success}</div>}
      <form onSubmit={handleUpdateUser} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">Nom</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full bg-gray-100 dark:bg-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">Nouveau mot de passe (laisser vide pour ne pas changer)</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">Mettre à jour le profil</Button>
      </form>
      <div>
        <Button onClick={handleDeleteUser} variant="destructive" className="w-full">Supprimer le compte</Button>
      </div>
    </div>
  );
}