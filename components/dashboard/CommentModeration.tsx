'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockComments, Comment, Product, mockProducts } from '@/lib/mockProducts';
import { Star, Check, X } from 'lucide-react';

export function CommentModeration() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [products, setProducts] = useState<Record<string, Product>>({});

  useEffect(() => {
    setComments(mockComments);
    const productMap = mockProducts.reduce((acc, product) => {
      acc[product.$id] = product;
      return acc;
    }, {} as Record<string, Product>);
    setProducts(productMap);
  }, []);

  const handleApprove = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, isApproved: true } : c
    ));
  };

  const handleReject = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modération des commentaires</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{products[comment.productId]?.name || 'Produit inconnu'}</TableCell>
                <TableCell>{comment.text}</TableCell>
                <TableCell>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={star <= comment.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  {!comment.isApproved && (
                    <>
                      <Button onClick={() => handleApprove(comment.id)} className="mr-2">
                        <Check className="h-4 w-4 mr-1" /> Approuver
                      </Button>
                      <Button onClick={() => handleReject(comment.id)} variant="destructive">
                        <X className="h-4 w-4 mr-1" /> Rejeter
                      </Button>
                    </>
                  )}
                  {comment.isApproved && <span className="text-green-500">Approuvé</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}