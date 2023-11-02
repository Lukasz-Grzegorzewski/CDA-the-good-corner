import recentAdsStyles from "./RecentAds.module.css";
import React, { useRef } from "react";
import { AdCard } from "./AdCard";
import { AdType } from "@/types";
import { useFetchCustom } from "@/gql_requests/fetchData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Dialog from "./Dialog";
import { useRouter } from "next/router";

const ads = [
  {
    id: 3,
    title: "Super car",
    description: "2024",
    owner: "Ado",
    price: 11000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYXA2vHXJb-i052xlABBOhmIjd2dTYxHOEg&usqp=CAU",
    location: "Lyon",
    category: {
      id: 1,
      name: "Updated categrory",
    },
    tags: [
      {
        id: 3,
        name: "Tag3",
      },
    ],
  },
];

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
  useFetchCustom(`/ads?page=${pageQuery}&limit=${limitQuery}`);

  // Pagination
  const maxPages = Math.ceil(20 / Number(limitQuery));
  const buttons = [];
  for (let i = 1; i <= maxPages; i++) {
    buttons.push(
      <Link
        key={i}
        href={`/?page=${i}&limit=${limitQuery}`}
        className={`${recentAdsStyles["link-page"]} ${
          i === Number(pageQuery) ? recentAdsStyles["link-page-active"] : ""
        }`}
        onClick={() => {
          router.push(`/?page=${i}&limit=${limitQuery}`);
        }}
      >
        {i}
      </Link>
    );
  }

  return (
    <main className="main-content">
      <h1 className={recentAdsStyles["title"]}>Annonces récentes</h1>
      <div className={recentAdsStyles["bar-filter"]}>
        <div className={recentAdsStyles["pages-links-container"]}>
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["two-arrow-left"]}`}
            onClick={() => {
              router.push(`/?page=1&limit=${limitQuery}`);
            }}
          >
            {"<<"}
          </button>
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["one-arrow-left"]}`}
            onClick={() => {
              router.push(
                `/?page=${
                  Number(pageQuery) > 1 ? Number(pageQuery) - 1 : "1"
                }&limit=${limitQuery}`
              );
            }}
          >
            {"<"}
          </button>
          {buttons.map((button) => button)}
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["one-arrow-right"]}`}
            onClick={() => {
              router.push(
                `/?page=${
                  Number(pageQuery) < maxPages
                    ? Number(pageQuery) + 1
                    : maxPages
                }&limit=${limitQuery}`
              );
            }}
          >
            {">"}
          </button>
          <button
            className={`${recentAdsStyles["arrow"]} ${recentAdsStyles["two-arrow-right"]}`}
            onClick={() => {
              router.push(`/?page=${maxPages}&limit=${limitQuery}`);
            }}
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
        {ads.map((ad) => (
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
