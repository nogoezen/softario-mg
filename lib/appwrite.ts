import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Si vous avez besoin de désactiver la vérification SSL en développement,
// vous pouvez le faire en configurant votre environnement ou en utilisant un proxy HTTPS.

export const account = new Account(client);
export const databases = new Databases(client);