'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Product } from '@/lib/mockProducts';
import { useCart } from '@/lib/CartContext';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const { name, price, image_url, rating } = product;

  return (
    <HoverEffect items={[{
      title: name,
      description: `${price.toFixed(2)} €`,
      link: `/product/${product.$id}`,
      icon: <Star className="h-4 w-4" />, // Ajoutez cette ligne
    }]}>
      <Card className="w-full h-full">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-2">
            <Image
              src={image_url}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={star <= rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button onClick={() => addToCart(product)} className="w-full">
            Ajouter au panier
          </Button>
        </CardFooter>
      </Card>
    </HoverEffect>
  );
}