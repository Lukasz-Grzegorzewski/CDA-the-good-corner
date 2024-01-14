import recentAdsStyles from "./RecentAds.module.css";
import React, { useState } from "react";
import { AdCard } from "./AdCard";
import { AdType } from "../types";
import { useSearchParams } from "next/navigation";
import { queryAds } from "../graphgql/ad/queryAds";
import { useQuery } from "@apollo/client";
import ButtonsPagination from "./buttons/ButtonsPagination";
import Filters from "./Filters";

type RecentAdsProps = {
  categoryId?: number;
};

export function RecentAds(props: RecentAdsProps): React.ReactNode {
  //states
  const [isFilters, setIsFilters] = useState(false);

  // Queries for pagination
  const searchQueries = useSearchParams();
  const page = searchQueries.get("page") || "1";
  const limit = searchQueries.get("limit") || "20";
  const searchTitle = searchQueries.get("searchTitle") || "";
  const categoriesQueryArray = searchQueries.get("category");
  const categories = categoriesQueryArray ? JSON.parse(categoriesQueryArray) : [];

  const where = {
    ...(categories.length > 0 ? { categoryId : categories} : {}),
    ...(searchTitle ? { searchTitle } : {}),
  };

  const {
    data: dataAds,
    error: errorAds,
    loading: loadingAds,
  } = useQuery<{ items: AdType[]; count: number }>(queryAds, {
    variables: {
      where,
      page,
      limit,
    },
  });
  const ads = dataAds ? dataAds.items : [];
  const countAdsPagination = dataAds ? dataAds.count : 0;

  return errorAds ? (
    <div>Error has occured </div>
  ) : (
    <main className="main-content">
      <div className={recentAdsStyles["ads-filter-container"]}>
        <h1 className={recentAdsStyles["header-title"]}>
          {loadingAds ? "Loading..." : "Annonces récentes"}
        </h1>
        <div
          className={
            isFilters
              ? recentAdsStyles["filters"]
              : `${recentAdsStyles["filters"]} ${recentAdsStyles["show"]}`
          }
        >
          <Filters categoriesArray={categories} isFilters={isFilters}/>
          <button
            className={recentAdsStyles["filters-btn"]}
            onClick={() => setIsFilters(!isFilters)}
          >
            <svg
              width="12"
              height="53"
              viewBox="0 0 12 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0V0C6.62742 0 12 5.37258 12 12V41C12 47.6274 6.62742 53 0 53V53V0Z"
                fill="#FFA41B"
              />
              <line x1="2.5" y1="32" x2="2.5" y2="21" stroke="white" />
              <line x1="5.5" y1="32" x2="5.5" y2="21" stroke="white" />
              <line x1="8.5" y1="32" x2="8.5" y2="21" stroke="white" />
              <circle cx="8.5" cy="24.5" r="1.5" fill="white" />
              <circle cx="5.5" cy="28.5" r="1.5" fill="white" />
              <circle cx="2.5" cy="24.5" r="1.5" fill="white" />
            </svg>
          </button>
        </div>
        <section className={recentAdsStyles["recent-ads"]}>
          {ads.map((ad: AdType) => (
            <div key={ad.id} className={`${recentAdsStyles["card"]}`}>
              <AdCard
                id={ad.id}
                title={ad.title}
                description={ad.description}
                owner={ad.owner}
                price={ad.price}
                imgurl={ad.imgurl}
                location={ad.location}
                createdAt={ad.createdAt}
                category={ad.category}
                tags={ad.tags}
              />
            </div>
          ))}
        </section>
        <div className={recentAdsStyles["pagination"]}>
          <ButtonsPagination
            count={countAdsPagination}
            page={page}
            limit={limit}
          />
        </div>
      </div>
    </main>
  );
}
