'use client';

import { LoginForm } from '@/app/components/front/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Connexion</h1>
        <LoginForm />
      </div>
    </div>
  );
}