import dotenv from 'dotenv';
import { Client, Databases, ID } from 'appwrite';
import { mockProducts } from '../lib/mockProducts';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);

async function seedDatabase() {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || '';

    for (const product of mockProducts) {
        try {
            await databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image_url: product.image_url,
                    category: product.category,
                    stock: product.stock,
                    sku: product.sku,
                    rating: product.rating
                }
            );
            console.log(`Added product: ${product.name}`);
        } catch (error) {
            console.error(`Error adding product ${product.name}:`, error);
        }
    }

    console.log('Database seeding completed');
}

seedDatabase();