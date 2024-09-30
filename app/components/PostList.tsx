'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { databases } from '@/lib/appwrite';
import { Query, Models } from 'appwrite';

interface Post extends Models.Document {
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databases.listDocuments<Post>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
          [Query.orderDesc('$createdAt'), Query.limit(10)]
        );
        setPosts(response.documents);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Chargement des articles...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Articles récents</h2>
      {posts.map((post) => (
        <Card key={post.$id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Par {post.author} le {new Date(post.created_at).toLocaleDateString()}</p>
            <p className="mt-2">{post.content.substring(0, 150)}...</p>
            <Link href={`/post/${post.$id}`} passHref>
              <Button className="mt-4">Lire la suite</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}