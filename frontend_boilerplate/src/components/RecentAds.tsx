import recentAdsStyles from "./RecentAds.module.css";
import React, { useRef } from "react";
import { AdCard } from "./AdCard";
import { AdType } from "@/types";
import { useCustomFetch } from "@/axiosRequests/fetchData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Dialog from "./Dialog";
import { useRouter } from "next/router";

export function RecentAds(): React.ReactNode {

  const router = useRouter();
  //DIALOG state & ref
  const refDialog = useRef<HTMLDialogElement>(null);

  function handleFilterClick() {
    refDialog.current?.showModal();
  }
 
  // Queries
  const searchQueries = useSearchParams();
  const pageQuery = searchQueries.get("page") || "1";
  const limitQuery = searchQueries.get("limit") || "10";

  // Fetch Data
  const { APIData, isLoading, error, isSucces, callCustomFetch, count } =
    useCustomFetch(`/ads?page=${pageQuery}&limit=${limitQuery}`);

  // Pagination
  const maxPages = Math.ceil(count / Number(limitQuery));
  const buttons = [];
  for (let i = 1; i <= maxPages; i++) {
    buttons.push(
      <Link
        key={i}
        href={`/?page=${i}&limit=${limitQuery}`}
        className={`${recentAdsStyles["link-page"]} ${
          i === Number(pageQuery) ? recentAdsStyles["link-page-active"] : ""
        }`}
        onClick={() => {router.push(`/?page=${i}&limit=${limitQuery}`)}}
      >
        {i}
      </Link>
    );
  }

  return !isLoading ? (
    <main className="main-content">
      <h1 className={recentAdsStyles["title"]}>Annonces récentes</h1>
      <div className={recentAdsStyles["bar-filter"]}>
        <div className={recentAdsStyles["pages-links-container"]}>
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["two-arrow-left"]}`}
            onClick={() => {router.push(`/?page=1&limit=${limitQuery}`)}}
          >
            {"<<"}
          </button>
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["one-arrow-left"]}`}
            onClick={() => {router.push(`/?page=${Number(pageQuery) > 1? Number(pageQuery) - 1 : "1"}&limit=${limitQuery}`)}}
          >
            {"<"}
          </button>
          {buttons.map((button) => button)}
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["one-arrow-right"]}`}
            onClick={() => {router.push(`/?page=${Number(pageQuery) < maxPages ? Number(pageQuery) + 1 : maxPages}&limit=${limitQuery}`)}}
          >
            {">"}
          </button>
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["two-arrow-right"]}`}
            onClick={() => {router.push(`/?page=${maxPages}&limit=${limitQuery}`)}}
          >
            {">>"}
          </button>
        </div>
        <button
          className={recentAdsStyles["filtres-btn"]}
          onClick={() => handleFilterClick()}
        >
          Filtres
        </button>
       <Dialog refDialog={refDialog} />
      </div>
      <section className={recentAdsStyles["recent-ads"]}>
        {APIData.map((item: AdType) => (
          <div key={item.id} className={`${recentAdsStyles["card"]}`}>
            <AdCard
              id={item.id}
              title={item.title}
              description={item.description}
              owner={item.owner}
              price={item.price}
              imgUrl={item.imgUrl}
              location={item.location}
              createdAt={item.createdAt}
              category={item.category}
              callCustomFetch={callCustomFetch}
            />
          </div>
        ))}
      </section>
    </main>
  ) : (
    <>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
      <h1>... LOADING</h1>
    </>
  );
}
