'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  enclosure?: {
    url: string;
    type: string;
  };
}

export function RssFeed() {
  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRss = async () => {
      const rssUrl = localStorage.getItem('rssUrl');
      if (!rssUrl) {
        setError("L'URL du flux RSS n'est pas définie");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/rss?url=${encodeURIComponent(rssUrl)}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du flux RSS');
        }
        const data = await response.json();
        setRssItems(data);
      } catch (err) {
        setError('Erreur lors du chargement du flux RSS');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRss();
  }, []);

  if (loading) return <div className="text-center py-10">Chargement du flux RSS...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dernières nouvelles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rssItems.map((item, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {item.enclosure && item.enclosure.type.startsWith('image/') && (
              <div className="relative h-48 w-full">
                <Image
                  src={item.enclosure.url}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibold line-clamp-2">{item.title}</CardTitle>
              <CardDescription>{new Date(item.pubDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{item.description}</p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300"
              >
                Lire la suite →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}