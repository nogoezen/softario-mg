"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { mockProducts } from '@/lib/mockProducts';

export function HeroSection() {
  const products = mockProducts.map(product => ({
    title: product.name,
    link: `/product/${product.$id}`,
    thumbnail: product.image_url,
  }));

  return (
    <HeroParallax products={products} />
  );
}