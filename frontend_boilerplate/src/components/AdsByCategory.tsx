import adsByCategory from "./AdsByCategory.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { AdCard } from "./AdCard";

import { API_URL } from "@/config";
import { AdType } from "@/types";

export default function AdsByCategory() {
  const [ads, setAds] = useState<AdType[]>([]);

  const router = useRouter();
  // const { categoryId } = router.query;
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const categoryId = params.categoryId


  useEffect(() => {
    fetchAds(categoryId);
  }, [categoryId]);

  async function fetchAds(id: string) {
    try {
      const result = await axios.get(API_URL + `/ads?categoryId=${id}`);
      setAds(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="main-content">
      <h2>{ads[0]?.category?.name}</h2>
      <section className={adsByCategory["recent-ads"]}>
        {ads.length > 0 &&
          ads.map((item) => (
            <div key={item.id}>
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
                callCustomFetch={() => fetchAds(String(categoryId))}
              />
            </div>
          ))}
      </section>
    </main>
  );
}
