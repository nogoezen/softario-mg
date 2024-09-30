'use client';

import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Models } from 'appwrite';

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
        await account.delete();
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profil Utilisateur</h2>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <form onSubmit={handleUpdateUser} className="space-y-4">
        <div>
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="password">Nouveau mot de passe (laisser vide pour ne pas changer)</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Mettre à jour le profil</Button>
      </form>
      <div>
        <Button onClick={handleDeleteUser} variant="destructive">Supprimer le compte</Button>
      </div>
    </div>
  );
}