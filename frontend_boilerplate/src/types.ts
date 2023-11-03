export type AdType = {
  id: number;
  owner: string;
  title: string;
  price: number;
  description?: string;
  imgUrl?: string;
  location?: string;
  category?: CategoryType;
  tags?: TagType[];
};

export type MutationAdType = {
  id?: number;
  owner?: string;
  title?: string;
  price?: number;
  description?: string;
  imgUrl?: string;
  location?: string;
  category?: {id: number};
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