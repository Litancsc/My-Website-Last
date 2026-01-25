export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categories: string[];
  author: string;
  published: boolean;
  views: number;
  createdAt?: string;
  publishedAt?: string;
}
