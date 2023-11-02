import React from "react";
import { AdCard } from "../AdCard";
import adsAdminStyles from "./AdsAdmin.module.css";
import { AdType } from "@/types";

type AdsAdminProps = {
  ads: AdType[];
}

function AdsAdmin({ads}: AdsAdminProps)  {
  return (
    <div className={adsAdminStyles["ads-admin"]}>
      {ads.map((item: AdType) => {
        return (
          <AdCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            owner={item.owner}
            price={item.price}
            imgUrl={item.imgUrl}
            location={item.location}
            category={item.category}
          />
        );
      })}
    </div>
  );
}

export default AdsAdmin;
