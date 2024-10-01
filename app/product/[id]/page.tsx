import { ProductItemDetail } from '../../components/front/ProductItemDetail';
import { Navbar } from '../../components/front/Navbar';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ProductItemDetail productId={params.id} />
      </main>
    </div>
  );
}