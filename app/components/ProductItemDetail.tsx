'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { mockProducts, Product } from '@/lib/mockProducts';
import { ShoppingCart, Package, Truck, Tag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { toast } from 'react-hot-toast';

export function ProductItemDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = mockProducts.find(p => p.$id === productId);
      setProduct(foundProduct || null);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Produit ajouté au panier');
    }
  };

  if (!product) {
    return <div className="text-center py-10">Produit non trouvé</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image_url}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <p className="text-3xl font-bold text-primary">{product.price.toFixed(2)} €</p>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          <div className="space-y-2">
            <p className="flex items-center text-sm">
              <Package className="mr-2 h-4 w-4" /> 
              <span className="font-semibold mr-2">SKU:</span> {product.sku}
            </p>
            <p className="flex items-center text-sm">
              <Truck className="mr-2 h-4 w-4" /> 
              <span className="font-semibold mr-2">En stock:</span> {product.stock}
            </p>
            <p className="flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4" /> 
              <span className="font-semibold mr-2">Catégorie:</span> {product.category}
            </p>
          </div>
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ajouter au panier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}