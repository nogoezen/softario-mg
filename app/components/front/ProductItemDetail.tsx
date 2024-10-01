'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { mockProducts, Product } from '@/lib/mockProducts';
import { ShoppingCart, Package, Truck, Tag, Star } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { toast } from 'react-hot-toast';

export function ProductItemDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{ text: string; rating: number }>>([]);

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

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { text: comment, rating }]);
      setComment('');
      setRating(0);
      toast.success('Commentaire ajouté');
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
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={star <= product.rating ? 'currentColor' : 'none'}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          <p className="text-3xl font-bold text-primary">{product.price.toFixed(2)} €</p>
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
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Noter ce produit</h3>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Laissez un commentaire..."
              className="w-full mb-2"
            />
            <Button onClick={handleCommentSubmit}>Soumettre</Button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Commentaires</h3>
            {comments.map((c, index) => (
              <div key={index} className="mb-4 p-3 bg-gray-100 rounded">
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= c.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}