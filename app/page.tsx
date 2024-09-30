import { LoginWrapper } from './components/LoginWrapper';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        <LoginWrapper />
      </div>
    </div>
  );
}
