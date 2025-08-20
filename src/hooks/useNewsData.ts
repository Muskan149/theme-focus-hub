import { useState, useEffect } from 'react';
import { Article } from '../types';
import { supabase } from '../lib/supabaseClient';


export function useNewsData() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);
        // Fetch articles from supabase (read-only via RLS)
        const { data: rawArticles, error } = await supabase
          .from('articles')
          .select('*')
          .order('publication_date', { ascending: false });

        if (error) throw error;
        if (!rawArticles) throw new Error('No articles found');

        // Transform the data for frontend
          const transformedArticles: Article[] = rawArticles.map((article) => ({
            id: article.id,
            title: article.title,
            source: article.source,
            sourceLogo: undefined,
            publicationUrl: article.publication_url,
            publicationDate: article.publication_date,
            summary: article.summary,
            tags: article.tags,
            theme: article.theme,
            isRead: article.isRead,
            isBookmarked: article.isBookmarked,
            uploadedDate: article.uploaded_at,
          }));

        setAllArticles(transformedArticles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news data');
        console.error('Error fetching news data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsData();
  }, []);

  return { allArticles, loading, error };
}
