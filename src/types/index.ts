export type Category = 'padya' | 'gadya';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: Category;
  media_urls: string[];
  likes_count: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  excerpt?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export interface Like {
  id: string;
  post_id: string;
  session_id: string;
  created_at: string;
}
