import { LoginWrapper } from './components/LoginWrapper';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Connexion</h1>
        <LoginWrapper />
      </div>
    </div>
  );
}
