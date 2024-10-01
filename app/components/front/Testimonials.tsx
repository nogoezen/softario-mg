import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    { id: 1, name: 'Alice', image: '/images/alice.jpg', rating: 5, comment: 'Excellent service !' },
    { id: 2, name: 'Bob', image: '/images/bob.jpg', rating: 4, comment: 'Très satisfait de mon achat.' },
    // Ajoutez d'autres témoignages...
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-blue-500' : 'text-gray-300'}`} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{testimonial.comment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}