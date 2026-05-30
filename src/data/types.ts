export type StaticDoc = {
  id: number;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  image: string;
  sourceUrl: string;
  type: "page" | "post";
  date: string;
  modified: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type Property = {
  slug: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  specs: string[];
  summary: string;
};
