'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

export function Navbar() {
  const [cmsName, setCmsName] = useState('Mon CMS');
  const [logoUrl, setLogoUrl] = useState('/default-logo.png'); // Assurez-vous d'avoir une image par défaut
  const { cart } = useCart();

  useEffect(() => {
    const savedCmsName = localStorage.getItem('cmsName');
    const savedLogoUrl = localStorage.getItem('logoUrl');
    if (savedCmsName) setCmsName(savedCmsName);
    if (savedLogoUrl) setLogoUrl(savedLogoUrl);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image src={logoUrl} alt={cmsName} width={40} height={40} className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold">{cmsName}</span>
          </div>
          <div className="flex items-center">
            <Link href="/cart" passHref>
              <Button variant="ghost" className="mr-2 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outline">
                <User className="h-5 w-5 mr-2" />
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}