'use client';

import { Product } from '@/lib/mockProducts';
import { LayoutGrid } from "@/components/ui/layout-grid";
import Image from 'next/image';

export function BestDeals({ products }: { products: Product[] }) {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Meilleures offres</h2>
      <LayoutGrid cards={products.map((product) => ({
        id: product.$id,
        content: (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src={product.image_url}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
            <p className="mt-2 text-lg font-bold text-blue-600">{product.price.toFixed(2)} €</p>
          </div>
        ),
        className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg",
        thumbnail: product.image_url,
      }))} />
    </div>
  );
}