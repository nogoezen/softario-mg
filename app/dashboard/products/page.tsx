'use client';

import { useState, useEffect } from 'react';
import { databases } from '@/lib/appwrite';
import { Query, Models } from 'appwrite';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { DashboardWrapper } from '@/components/dashboard/DashboardWrapper';

// Importez ces composants si vous les avez, sinon créez-les ou utilisez des alternatives HTML standard
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Product extends Models.Document {
  name: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments<Product>(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')]
      );
      setProducts(response.documents);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      toast.error('Erreur lors de la récupération des produits');
    }
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
    <DashboardWrapper>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Gestion des produits</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Prix</th>
              <th className="py-2 px-4 border-b">Catégorie</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">SKU</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.$id}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.price} €</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">{product.sku}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/dashboard/products/edit/${product.$id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Modifier</button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.$id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Link href="/dashboard/products/create">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Ajouter un produit</button>
          </Link>
        </div>
      </div>
    </DashboardWrapper>
  );
}