'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const testimonials = [
  { id: 1, name: 'Alice', image: '/images/user1.jpg', rating: 5, comment: 'Excellent service ! Je suis vraiment impressionnée par la qualité des produits.' },
  { id: 2, name: 'Bob', image: '/images/user2.jpg', rating: 4, comment: 'Très satisfait de mon achat. La livraison était rapide et le produit correspond parfaitement à la description.' },
  { id: 3, name: 'Claire', image: '/images/claire.jpg', rating: 5, comment: 'Je recommande vivement ! Le service client est exceptionnel et les prix sont très compétitifs.' },
  { id: 4, name: 'David', image: '/images/david.jpg', rating: 4, comment: 'Bonne expérience globale. Le site est facile à utiliser et les produits sont de bonne qualité.' },
  { id: 5, name: 'Émilie', image: '/images/emilie.jpg', rating: 5, comment: 'Absolument ravi de mon achat ! Je reviendrai certainement pour mes prochains besoins.' },
  { id: 6, name: 'François', image: '/images/francois.jpg', rating: 4, comment: 'Produits de qualité et service fiable. Petit bémol sur les délais de livraison, mais rien de grave.' },
];

export function Testimonials() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <CardContainer key={testimonial.id} className="inter-var">
              <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {testimonial.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {testimonial.comment}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={testimonial.image}
                    height="200"
                    width="200"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={testimonial.name}
                  />
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
}