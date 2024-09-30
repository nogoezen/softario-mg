import { ProductDetail } from '@/components/ProductDetail';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <ProductDetail productId={params.id} />
    </div>
  );
}