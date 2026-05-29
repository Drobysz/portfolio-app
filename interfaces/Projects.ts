export interface Project {
  id: number;
  title: string;
  slug: string;

  period: string | null;
  tag: string | null;

  short_description: string | null;
  description: string | null;

  cover_image_path: string | null;
  cover_image_url: string | null;

  project_image_path: string | null;
  project_image_url: string | null;

  project_url: string | null;
  repository_url: string | null;

  sort_order: number;
  is_published: boolean;

  stacks: Stack[];

  created_at: string | null;
  updated_at: string | null;
}

export interface Stack {
  id: number;
  name: string;
  technologies: string | null;
  created_at: string | null;
  updated_at: string | null;
}