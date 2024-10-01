import { ProductCRUD } from '@/components/dashboard/ProductCRUD';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Ajouter un nouveau produit</h1>
      <ProductCRUD />
    </div>
  );
}