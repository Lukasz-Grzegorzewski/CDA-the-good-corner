import { off } from "process";

export type AdType = {
  id: number;
  owner: string;
  title: string;
  price: number;
  description?: string;
  imgUrl?: string;
  location?: string;
  createdAt: string;
  category?: CategoryType;
  tags?: TagType[];
};

export type MutationAdType = {
  id?: number;
  owner?: string;
  title?: string;
  price?: number;
  description?: string;
  imgurl?: string;
  location?: string;
  category?: {id: number};
  tags: Omit<TagType, "name">[] | [];
};

export type CategoryType = {
  id: number;
  name: string;
};

export type TagType = {
  id: number;
  name: string;
};