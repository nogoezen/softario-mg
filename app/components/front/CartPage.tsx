'use client';

import { useCart } from '@/lib/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const updateQuantity = (productId: string, newQuantity: number) => {
    const product = cart.find(item => item.$id === productId);
    if (product) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        const difference = newQuantity - product.quantity;
        for (let i = 0; i < Math.abs(difference); i++) {
          if (difference > 0) {
            addToCart(product);
          } else {
            removeFromCart(productId);
          }
        }
      }
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="text-center py-10">Votre panier est vide</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Votre Panier</h1>
      {cart.map((item) => (
        <Card key={item.$id}>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="relative w-24 h-24">
              <Image 
                src={item.image_url} 
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => updateQuantity(item.$id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input 
                type="number" 
                value={item.quantity}
                onChange={(e) => updateQuantity(item.$id, parseInt(e.target.value))}
                className="w-16 text-center"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => updateQuantity(item.$id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => removeFromCart(item.$id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Total: {totalPrice.toFixed(2)} €</p>
        <div className="space-x-2">
          <Button variant="outline" onClick={clearCart}>Vider le panier</Button>
          <Button>Passer la commande</Button>
        </div>
      </div>
    </div>
  );
}