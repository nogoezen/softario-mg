'use client';

import { Navbar } from '@/app/components/front/Navbar';
import { BestDeals } from '@/app/components/front/BestDeals';
import { ProductList } from '@/app/components/front/ProductList';
import { Footer } from '@/app/components/front/Footer';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { bestDeals } from '@/lib/mockProducts';

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			<Navbar />
			<main className="container mx-auto px-4 py-8">
				<TextGenerateEffect words="Bienvenue chez Softario" className="text-5xl font-bold text-center my-12" />
				<BestDeals products={bestDeals} />
				<TextGenerateEffect words="Tous nos produits" className="text-4xl font-bold text-center my-12" />
				<ProductList />
				<div className="my-20">
					<h2 className="text-3xl font-bold text-center mb-8">Ce que disent nos clients</h2>
					<InfiniteMovingCards
						items={[
							{
								quote: "Un service exceptionnel !",
								name: "Marie L.",
								title: "Cliente satisfaite"
							},
							{
								quote: "Des produits de qualité supérieure.",
								name: "Pierre D.",
								title: "Client fidèle"
							},
							{
								quote: "Je recommande vivement !",
								name: "Sophie M.",
								title: "Nouvelle cliente"
							},
						]}
						direction="right"
						speed="slow"
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
