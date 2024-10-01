import { BestDeals } from './BestDeals';
import { mockProducts } from '@/lib/mockProducts';

export function HeroSection() {
  const bestDeals = mockProducts.slice(0, 5); // Prend les 5 premiers produits comme meilleures offres

  return (
    <div className="space-y-12">
      <div className="h-[40rem] w-full rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Bienvenue chez Softario
          </h1>
          <p className="text-neutral-200 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Découvrez notre sélection de produits exceptionnels, conçus pour répondre à tous vos besoins.
          </p>
        </div>
      </div>
      <BestDeals products={bestDeals} />
    </div>
  );
}