'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { databases } from '@/lib/appwrite';
import { Models } from 'appwrite';
import Image from 'next/image';

interface Product extends Models.Document {
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await databases.getDocument<Product>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!,
          productId
        );
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Chargement du produit...</div>;
  if (!product) return <div>Produit non trouvé</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image 
            src={product.image_url} 
            alt={product.name} 
            layout="fill" 
            objectFit="cover" 
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <p className="mt-4">{product.description}</p>
        <p className="mt-2 text-lg font-medium text-gray-900">{product.price.toFixed(2)} €</p>
        <Button className="mt-4 w-full">Ajouter au panier</Button>
      </CardContent>
    </Card>
  );
}