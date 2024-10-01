'use client';

import { useState, useEffect } from 'react';
import { mockProducts, Product } from '@/lib/mockProducts';
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <DirectionAwareHover
          key={product.$id}
          imageUrl={product.image_url}
          title={product.name}
          description={`${product.price.toFixed(2)} €`}
          link={`/product/${product.$id}`}
        />
      ))}
    </div>
  );
}