'use client';

import { useState, useEffect } from 'react';
import { databases } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-hot-toast';

interface Product {
  $id?: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  sku: string;
  rating: number;
}

export function ProductCRUD() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '', description: '', price: 0, image_url: '', category: '', stock: 0, sku: '', rating: 0
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')]
      );
      setProducts(response.documents as Product[]);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      toast.error('Erreur lors de la récupération des produits');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' || name === 'rating' ? parseFloat(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentProduct.$id) {
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!,
          currentProduct.$id,
          currentProduct
        );
        toast.success('Produit mis à jour avec succès');
      } else {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!,
          ID.unique(),
          currentProduct
        );
        toast.success('Produit créé avec succès');
      }
      setCurrentProduct({ name: '', description: '', price: 0, image_url: '', category: '', stock: 0, sku: '', rating: 0 });
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du produit:', error);
      toast.error('Erreur lors de la sauvegarde du produit');
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await databases.deleteDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!,
          id
        );
        toast.success('Produit supprimé avec succès');
        fetchProducts();
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        toast.error('Erreur lors de la suppression du produit');
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" value={currentProduct.name} onChange={handleInputChange} placeholder="Nom du produit" required />
        <Textarea name="description" value={currentProduct.description} onChange={handleInputChange} placeholder="Description" required />
        <Input name="price" type="number" value={currentProduct.price} onChange={handleInputChange} placeholder="Prix" required />
        <Input name="image_url" value={currentProduct.image_url} onChange={handleInputChange} placeholder="URL de l'image" required />
        <Input name="category" value={currentProduct.category} onChange={handleInputChange} placeholder="Catégorie" required />
        <Input name="stock" type="number" value={currentProduct.stock} onChange={handleInputChange} placeholder="Stock" required />
        <Input name="sku" value={currentProduct.sku} onChange={handleInputChange} placeholder="SKU" required />
        <Input name="rating" type="number" step="0.1" min="0" max="5" value={currentProduct.rating} onChange={handleInputChange} placeholder="Note" required />
        <Button type="submit">{isEditing ? 'Mettre à jour' : 'Créer'} le produit</Button>
      </form>

      <div className="space-y-4">
        {products.map(product => (
          <div key={product.$id} className="border p-4 rounded-md">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>Prix: {product.price} €</p>
            <div className="mt-2 space-x-2">
              <Button onClick={() => handleEdit(product)}>Modifier</Button>
              <Button variant="destructive" onClick={() => product.$id && handleDelete(product.$id)}>Supprimer</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}