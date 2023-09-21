export type Ad = {
  [key: string]: string | number | undefined;
  id: number;
  title: string;
  description?: string;
  owner: string;
  price?: number;
  picture?: string;
  location?: string;
  createdAt: string;
};

export type Category = {
  [key: string]: string | number | undefined;
  id: number;
  name: string;
};

export type AdsWithCategoryName = Ad & { categoryName: string };
