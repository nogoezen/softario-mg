'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { mockProducts, Product, mockComments, Comment } from '@/lib/mockProducts';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { toast } from 'react-hot-toast';
import { useUser } from '@/contexts/UserContext';

export function ProductItemDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { addToCart } = useCart();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.$id === productId);
    setProduct(foundProduct || null);
    const productComments = mockComments.filter(c => c.productId === productId && c.isApproved);
    setComments(productComments);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Produit ajouté au panier');
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim() && rating > 0 && user) {
      const newComment: Comment = {
        id: Date.now().toString(),
        productId,
        userId: user.id,
        text: comment,
        rating,
        createdAt: new Date().toISOString(),
        isApproved: false,
      };
      setComments([...comments, newComment]);
      setComment('');
      setRating(0);
      toast.success('Commentaire soumis pour approbation');
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
  };

  if (!product) return <div>Produit non trouvé</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={product.image_url} alt={product.name} width={300} height={300} />
        <p>{product.description}</p>
        <p>Prix : {product.price.toFixed(2)} €</p>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2" />
          Ajouter au panier
        </Button>
        <div>
          <h3>Laisser un commentaire</h3>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre commentaire..."
          />
          <Button onClick={handleCommentSubmit}>Envoyer</Button>
        </div>
        <div>
          <h3>Commentaires</h3>
          {comments.map((c) => (
            <div key={c.id}>
              <p>{c.text}</p>
              <p>Note : {c.rating}/5</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}