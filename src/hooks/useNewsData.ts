import { useState, useEffect } from 'react';
import { Article } from '../types';
import { fetchArticlesFromSupabase } from "../../scripts/fetch_perplexity_news.js";


export function useNewsData() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);
        // Fetch articles from supabase
          const rawArticles = await fetchArticlesFromSupabase();
          console.log("rawArticles: ", rawArticles);

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
