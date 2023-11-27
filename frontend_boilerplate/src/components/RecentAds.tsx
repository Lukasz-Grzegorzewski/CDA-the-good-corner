import recentAdsStyles from "./RecentAds.module.css";
import React, { useRef } from "react";
import { AdCard } from "./AdCard";
import { AdType } from "@/types";
import { useSearchParams } from "next/navigation";
import Dialog from "./Dialog";
import { ads_Filter_ByProductName, queryAds } from "@/graphgql/ad/queryAds";
import { useQuery } from "@apollo/client";
import ButtonsPagination from "./buttons/ButtonsPagination";

export function RecentAds(): React.ReactNode {
  const query = "car";
  const {
    data: dataAds,
    error: errorAds,
    loading: loadingAds,
  } = useQuery<{ items: AdType[] }>(queryAds);
  const {
    data: adsDataFilterByName,
    error: adsErrorByName,
    loading: adsLoadingByName,
  } = useQuery<{ items: AdType[] }>(ads_Filter_ByProductName, {
    variables: { query },
  });

  const ads = query
    ? adsDataFilterByName
      ? adsDataFilterByName.items
      : []
    : dataAds
    ? dataAds.items
    : [];

  //DIALOG state & ref
  const refDialog = useRef<HTMLDialogElement>(null);
  function handleFilterClick() {
    refDialog.current?.showModal();
  }

  // Queries for pagination
  const searchQueries = useSearchParams();
  const pageQuery = searchQueries.get("page") || "1";
  const limitQuery = searchQueries.get("limit") || "10";

  return errorAds ? (
    <div>Error has occured </div>
  ) : (
    <main className="main-content">
      <h1 className={recentAdsStyles["title"]}>
        {loadingAds ? "Loading..." : "Annonces récentes"}
      </h1>
      <div className={recentAdsStyles["bar-filter"]}>
        <ButtonsPagination
          count={ads.length}
          pageQuery={pageQuery}
          limitQuery={limitQuery}
        />
        <button
          className={recentAdsStyles["filtres-btn"]}
          onClick={() => handleFilterClick()}
        >
          Filtres
        </button>
        <input type="text" name="" id=""></input>
        <Dialog refDialog={refDialog} />
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
              imgUrl={ad.imgUrl}
              location={ad.location}
              createdAt={ad.createdAt}
              category={ad.category}
              tags={ad.tags}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
