'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts, Product } from '@/lib/mockProducts';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulez un chargement asynchrone
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="text-center">Chargement des produits...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.$id} className="flex flex-col">
          <CardHeader>
            <div className="relative w-full h-48">
              <Image 
                src={product.image_url} 
                alt={product.name} 
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-t-lg"
              />
            </div>
            <CardTitle className="mt-4 text-lg font-medium">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mt-1 text-sm text-gray-500">{product.description.substring(0, 100)}...</p>
            <p className="mt-2 text-lg font-medium text-gray-900">{product.price.toFixed(2)} €</p>
            <Link href={`/product/${product.$id}`} passHref>
              <Button className="mt-4 w-full">Voir le produit</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}