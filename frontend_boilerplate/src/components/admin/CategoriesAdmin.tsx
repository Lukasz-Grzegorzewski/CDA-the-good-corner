import adminStyles from "./CategoriesAdmin.module.css";
import { useCustomFetch } from "@/axiosRequests/fetchData";
import { API_URL } from "@/config";
import CardCategory, { CardCategoryProps } from "./CardCategory";
import { useEffect, useState } from "react";

export type CategoriesAdminPropsType = {
  APIData: CardCategoryProps[];
  isLoading: boolean;
  isSucces: boolean;
  error: any;
  callCustomFetch: Function;
};

export default function CategoriesAdmin({
  APIData,
  isLoading,
  isSucces,
  error,
  callCustomFetch,
}: CategoriesAdminPropsType) {
  return (
    <section className={adminStyles["category-cards-container"]}>
      {APIData &&
        APIData.map((category: CardCategoryProps) => (
          <CardCategory
            key={category.id}
            name={category.name}
            id={category.id}
            adsCount={category.adsCount}
            callCustomFetch={callCustomFetch}
          />
        ))}
    </section>
  );
}
