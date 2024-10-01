import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/ThemeContext";
import { CartProvider } from '@/lib/CartContext';
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { UserProvider } from '@/contexts/UserContext';

export const metadata: Metadata = {
  title: "Mon CMS",
  description: "Un CMS personnalisable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <UserProvider>
          <ThemeProvider>
            <CartProvider>
              {children}
              <Toaster position="bottom-right" />
            </CartProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
