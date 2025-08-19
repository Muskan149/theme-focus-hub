export interface Theme {
  id: string;
  name: string;
  visible: boolean;
  count?: number;
}

export interface Article {
  id: string;
  title: string;
  source: string;
  sourceLogo?: string;
  publicationUrl: string;
  publicationDate: string;
  summary: string;
  tags: string[];
  theme: string;
  isRead?: boolean;
  isBookmarked?: boolean;
  uploadedDate: string;
}
