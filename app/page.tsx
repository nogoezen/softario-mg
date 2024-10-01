'use client';

import { NavbarComponent } from '@/components/front/Navbar';
import { BestDeals } from '@/components/front/BestDeals';
import { ProductList } from '@/components/front/ProductList';
import { Footer } from '@/components/front/Footer';
import { Testimonials } from '@/components/front/Testimonials';
import { HeroSection } from '@/components/front/HeroSection';
import { mockProducts } from '@/lib/mockProducts';

export default function Home() {
	const bestDealsProducts = mockProducts.slice(0, 5); // Get the first 5 products for best deals

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			<NavbarComponent />
			<main className="container mx-auto px-4 py-8">
				<HeroSection />
				<ProductList />
				<Testimonials />
			</main>
			<Footer />
		</div>
	);
}
