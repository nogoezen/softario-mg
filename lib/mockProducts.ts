import { Models } from 'appwrite';

export interface Product extends Models.Document {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  sku: string;
  rating: number;
}

export const mockProducts: Product[] = [
  {
    $id: '1',
    name: "Smartphone XYZ",
    description: "Le dernier smartphone avec des fonctionnalités avancées.",
    price: 699.99,
    image_url: "/images/products/smartphone.jpg",
    category: "Électronique",
    stock: 50,
    sku: "SMXYZ001",
    rating: 4.5,
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'products',
    $databaseId: 'default',
  },
  {
    $id: '2',
    name: "Laptop Pro",
    description: "Un ordinateur portable puissant pour les professionnels.",
    price: 1299.99,
    image_url: "/images/products/laptop.jpg",
    category: "Informatique",
    stock: 30,
    sku: "LTPRO002",
    rating: 4.8,
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'products',
    $databaseId: 'default',
  },
  {
    $id: '3',
    name: "Casque audio sans fil",
    description: "Un casque confortable avec une qualité sonore exceptionnelle.",
    price: 199.99,
    image_url: "/images/products/headset.jpg",
    category: "Audio",
    stock: 100,
    sku: "HDPHN003",
    rating: 4.3,
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'products',
    $databaseId: 'default',
  },
  {
    $id: '4',
    name: "Montre connectée",
    description: "Une montre intelligente avec suivi de la santé et des notifications.",
    price: 249.99,
    image_url: "/images/products/smartwatch.jpg",
    category: "Wearables",
    stock: 75,
    sku: "SWTCH004",
    rating: 4.6,
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'products',
    $databaseId: 'default',
  },
  {
    $id: '5',
    name: "Enceinte Bluetooth portable",
    description: "Une enceinte compacte avec un son puissant pour vos déplacements.",
    price: 89.99,
    image_url: "/images/products/speaker.jpg",
    category: "Audio",
    stock: 120,
    sku: "BTSPK005",
    rating: 4.2,
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'products',
    $databaseId: 'default',
  },
];

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  text: string;
  rating: number;
  createdAt: string;
  isApproved: boolean;
}

export const mockComments: Comment[] = [
  // Gardez quelques commentaires d'exemple
];

export const bestDeals: Product[] = mockProducts.slice(0, 5); // ou toute autre logique pour sélectionner les meilleures offres