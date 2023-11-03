import recentAdsStyles from "./RecentAds.module.css";
import React, { useRef } from "react";
import { AdCard } from "./AdCard";
import { AdType } from "@/types";
import { useSearchParams } from "next/navigation";
import Dialog from "./Dialog";
import { queryAds } from "@/graphgql/ad/queryAds";
import { useQuery } from "@apollo/client";
import ButtonsPagination from "./buttons/ButtonsPagination";

export function RecentAds(): React.ReactNode {
  const {data, error, loading} = useQuery<{items: AdType[]}>(queryAds);
  const ads = data ? data.items : [];

  const clientOptions = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language || "en-GB",
  }
console.log(`clientOptions.timeZone : `, clientOptions.timeZone);


    //DIALOG state & ref
  const refDialog = useRef<HTMLDialogElement>(null);
  function handleFilterClick() {
    refDialog.current?.showModal();
  }

  // Queries for pagination
  const searchQueries = useSearchParams();
  const pageQuery = searchQueries.get("page") || "1";
  const limitQuery = searchQueries.get("limit") || "10";

  return (
    <main className="main-content">
      <h1 className={recentAdsStyles["title"]}>{loading ? "Loading..." : "Annonces récentes"}</h1>
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
              category={ad.category}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
