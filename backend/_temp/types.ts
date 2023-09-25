export type AdType = {
  [key: string]: string | number | undefined;
  id: number;
  title: string;
  description?: string;
  owner: string;
  price?: number;
  picture?: string;
  location?: string;
  category?: number;
  createdAt?: string;
};

export type CategoryType = {
  [key: string]: string | number | undefined;
  id: number;
  name: string;
};

