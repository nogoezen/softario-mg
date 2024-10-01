'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/';
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { databases } from '@/lib/appwrite';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          'your-database-id',
          'your-collection-id'
        );
        setProducts(response.documents as Product[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
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