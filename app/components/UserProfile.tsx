'use client';

import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Models } from 'appwrite';
import { ID } from 'appwrite';
import Image from 'next/image';
import { createHash } from 'crypto';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Lock, Edit2 } from 'lucide-react';

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

  const getGravatarUrl = (email: string) => {
    const hash = createHash('md5').update(email.toLowerCase().trim()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?s=400&d=identicon`;
  };

  if (!user) {
    return <div className="flex justify-center items-center h-full">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold">Profil Utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-lg">
                <Image
                  src={getGravatarUrl(email)}
                  alt="Photo de profil"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <form onSubmit={handleUpdateUser} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User size={18} />
                    Nom
                  </Label>
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
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail size={18} />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="w-full bg-gray-100 dark:bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock size={18} />
                    Nouveau mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    placeholder="Laisser vide pour ne pas changer"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    <Edit2 size={18} className="mr-2" />
                    Mettre à jour le profil
                  </Button>
                  <Button onClick={handleDeleteUser} variant="destructive" className="flex-1">
                    Supprimer le compte
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}