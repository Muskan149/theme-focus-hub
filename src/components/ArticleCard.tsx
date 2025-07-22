import { ExternalLink, Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ArticleCardProps {
  title: string;
  source: string;
  sourceLogo?: string;
  date: string;
  summary: string;
  tags: string[];
  link: string;
  isRead?: boolean;
  isBookmarked?: boolean;
}

export const ArticleCard = ({
  title,
  source,
  sourceLogo,
  date,
  summary,
  tags,
  link,
  isRead = false,
  isBookmarked = false,
}: ArticleCardProps) => {
  const [read, setRead] = useState(isRead);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  return (
    <div className="kanban-card hover-lift fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {sourceLogo && (
            <img 
              src={sourceLogo} 
              alt={source} 
              className="source-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{source}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRead(!read)}
            className={`p-1 h-8 w-8 ${read ? 'text-green-600' : 'text-gray-400'}`}
          >
            <Check size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1 h-8 w-8 ${bookmarked ? 'text-primary' : 'text-gray-400'}`}
          >
            <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
        {title}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="theme-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Summary */}
      <p className="article-summary mb-4">
        {summary}
      </p>

      {/* Link */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-center gap-2"
        onClick={() => window.open(link, '_blank')}
      >
        <ExternalLink size={16} />
        Read Article
      </Button>
    </div>
  );
};