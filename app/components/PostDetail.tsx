'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { databases, account } from '@/lib/appwrite';
import { ID, Query, Models } from 'appwrite';

interface Post extends Models.Document {
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface Comment extends Models.Document {
  content: string;
  author: string;
  created_at: string;
}

export function PostDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await databases.getDocument<Post>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
          postId
        );
        setPost(postResponse);

        const commentsResponse = await databases.listDocuments<Comment>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
          [Query.equal('post_id', postId), Query.orderDesc('$createdAt')]
        );
        setComments(commentsResponse.documents);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await account.get();
      const response = await databases.createDocument<Comment>(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
        ID.unique(),
        {
          content: newComment,
          author: user.name,
          post_id: postId
        }
      );
      setComments([response, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <div>Chargement de l'article...</div>;
  if (!post) return <div>Article non trouvé</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Par {post.author} le {new Date(post.created_at).toLocaleDateString()}</p>
          <p className="mt-4">{post.content}</p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          required
        />
        <Button type="submit">Publier le commentaire</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Commentaires</h3>
        {comments.map((comment) => (
          <Card key={comment.$id}>
            <CardContent>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">Par {comment.author} le {new Date(comment.created_at).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}