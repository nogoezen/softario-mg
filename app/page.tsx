import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Notre boutique en ligne</h1>
        <ProductList />
      </main>
    </div>
  );
}
