export type AdType = {
  id?: number;
  title: string;
  description: string;
  owner?: string;
  price: number;
  imgUrl?: string;
  location?: string;
  createdAt?: Date;
  category?: {
    id: number;
    name: string;
  };
};

export type CategoryType = {
  id: number;
  name: string;
};