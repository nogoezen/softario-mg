'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setError(error.message || 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <div className="flex items-center">
          <Lock className="w-4 h-4 mr-2" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit">Se connecter</Button>
    </form>
  );
}