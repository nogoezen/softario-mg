import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/ThemeContext";
import "./globals.css";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
