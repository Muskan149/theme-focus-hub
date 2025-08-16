import { ArticleCard } from "./ArticleCard";

interface Article {
  id: string;
  title: string;
  source: string;
  sourceLogo?: string;
  publicationUrl: string;
  publicationDate: string;
  summary: string;
  tags: string[];
  isRead?: boolean;
  isBookmarked?: boolean;
}


interface KanbanColumnProps {
  title: string;
  articles: Article[];
  count: number;
}

export const KanbanColumn = ({ title, articles, count }: KanbanColumnProps) => {
  return (
    <div className="kanban-column">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span className="bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-full">
          {count}
        </span>
      </div>
      
      <div className="space-y-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            source={article.source}
            sourceLogo={article.sourceLogo}
            publicationDate={article.publicationDate}
            summary={article.summary}
            tags={article.tags}
            publicationUrl={article.publicationUrl}
            isRead={article.isRead}
            isBookmarked={article.isBookmarked}
          />
        ))}
      </div>
    </div>
  );
};