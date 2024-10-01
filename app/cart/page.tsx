import { CartPage } from '../components/CartPage';
import { Navbar } from '../components/Navbar';

export default function Cart() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CartPage />
      </main>
    </div>
  );
}