export interface Product {
  $id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  sku: string;
}

export const mockProducts: Product[] = [
  {
    $id: '1',
    name: 'Smartphone XYZ',
    description: 'Un smartphone puissant avec un appareil photo de haute qualité et une batterie longue durée.',
    price: 699.99,
    image_url: '/images/products/smartphone.jpg',
    category: 'Électronique',
    stock: 50,
    sku: 'PHONE-XYZ-001'
  },
  {
    $id: '2',
    name: 'Laptop Pro',
    description: 'Un ordinateur portable performant pour les professionnels et les créatifs.',
    price: 1299.99,
    image_url: '/images/products/laptop.jpg',
    category: 'Informatique',
    stock: 30,
    sku: 'LAPTOP-PRO-002'
  },
  {
    $id: '3',
    name: 'Casque audio sans fil',
    description: 'Un casque audio bluetooth avec une qualité sonore exceptionnelle et une autonomie de 30 heures.',
    price: 199.99,
    image_url: '/images/products/headset.jpg',
    category: 'Audio',
    stock: 100,
    sku: 'AUDIO-WH-003'
  },
  {
    $id: '4',
    name: 'Montre connectée Sport',
    description: 'Une montre intelligente pour suivre vos activités sportives et votre santé au quotidien.',
    price: 249.99,
    image_url: '/images/products/smartwatch.jpg',
    category: 'Wearables',
    stock: 75,
    sku: 'WATCH-SPORT-004'
  },
  {
    $id: '5',
    name: 'Enceinte portable',
    description: 'Une enceinte bluetooth compacte et résistante à l\'eau pour emporter votre musique partout.',
    price: 89.99,
    image_url: '/images/products/speaker.jpg',
    category: 'Audio',
    stock: 120,
    sku: 'AUDIO-PS-005'
  },
  {
    $id: '6',
    name: 'Tablette graphique',
    description: 'Une tablette graphique professionnelle pour les artistes numériques et les designers.',
    price: 349.99,
    image_url: '/images/products/tablet.jpg',
    category: 'Périphériques',
    stock: 40,
    sku: 'TABLET-GT-006'
  },
  {
    $id: '7',
    name: 'Caméra d\'action 4K',
    description: 'Une caméra d\'action robuste pour capturer vos aventures en haute définition.',
    price: 299.99,
    image_url: '/images/products/camera.jpg',
    category: 'Photo & Vidéo',
    stock: 60,
    sku: 'CAM-ACTION-007'
  },
  {
    $id: '8',
    name: 'Clavier mécanique gaming',
    description: 'Un clavier mécanique rétroéclairé pour les gamers exigeants.',
    price: 129.99,
    image_url: '/images/products/keyboard.jpg',
    category: 'Gaming',
    stock: 90,
    sku: 'KB-MECH-008'
  }
];