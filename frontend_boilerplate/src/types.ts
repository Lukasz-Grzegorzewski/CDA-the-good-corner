export type AdType = {
  id: number;
  owner: string;
  title: string;
  price: number;
  description?: string;
  imgUrl?: string;
  location?: string;
  createdAt?: Date;
  category?: CategoryType;
  tags?: TagType[];
};

export type CategoryType = {
  id: number;
  name: string;
};

export type TagType = {
  id: number;
  name: string;
};
