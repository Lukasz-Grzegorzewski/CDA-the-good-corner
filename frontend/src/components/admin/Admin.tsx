import adminStyles from "./Admin.module.css";
import { useCustomFetch } from "@/axiosRequests/fetchData";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/config";
import CardCategory, { CardCategoryProps } from "./CardCategory";
import { useEffect, useState } from "react";
import CategoriesAdmin from "./CategoriesAdmin";
import { RecentAds } from "../RecentAds";
import AdsAdmin from "./AdsAdmin";
import TagsAdmin from "./TagsAdmin";
import { AdType } from "@/types";

export type AdminContentPropsType = {
  APIData: AdType[];
  isLoading: boolean;
  isSucces: boolean;
  error: any;
  callCustomFetch: Function;
};

export default function Admin() {
  const {
    APIData: adsFetch,
    isLoading: isLoadingFetchAds,
    isSucces: isSuccesFetchAds,
    error: errorFetchAds,
    callCustomFetch: fetchAds,
  } = useCustomFetch("/ads");

  const {
    APIData: categoriesFetch,
    isLoading: isLoadingFetchCategories,
    isSucces: isSuccesFetchCategories,
    error: errorFetchCategories,
    callCustomFetch: fetchCategories,
  } = useCustomFetch("/categories");

  const {
    APIData: tagsFetch,
    isLoading: isLoadingFetchTags,
    isSucces: isSuccesFetchTags,
    error: errorFetchTags,
    callCustomFetch: fetchTags,
  } = useCustomFetch("/tags");

  const searchParams = useSearchParams();
  const queryParam = searchParams.get("item") || "ads";

  return (
    <section className={adminStyles["admin-content"]}>
      {queryParam === "ads" && (
        <AdsAdmin
          APIData={adsFetch}
          isLoading={isLoadingFetchAds}
          isSucces={isSuccesFetchAds}
          error={errorFetchAds}
          callCustomFetch={fetchAds}
        />
      )}
      {queryParam === "categories" && (
        <CategoriesAdmin
          APIData={categoriesFetch}
          isLoading={isLoadingFetchCategories}
          isSucces={isSuccesFetchCategories}
          error={errorFetchCategories}
          callCustomFetch={fetchCategories}
        />
      )}
      {queryParam === "tags" && (
        <TagsAdmin
          APIData={tagsFetch}
          isLoading={isLoadingFetchTags}
          isSucces={isSuccesFetchTags}
          error={errorFetchTags}
          callCustomFetch={fetchTags}
        />
      )}
    </section>
  );
}
