import React from "react";
import { AdminContentPropsType } from "./Admin";
import { AdCard, AdCardProps } from "../AdCard";
import adsAdminStyles from "./AdsAdmin.module.css";

export type AdsAdminPropsType = {
  APIData: AdCardProps[];
  isLoading: boolean;
  isSucces: boolean;
  error: any;
  callCustomFetch: () => void;
};

function AdsAdmin({
  APIData,
  isLoading,
  isSucces,
  error,
  callCustomFetch,
}: AdsAdminPropsType) {
  return (
    <div className={adsAdminStyles["ads-admin"]}>
      {APIData.map((item: AdCardProps) => {
        return <AdCard
          key={item.id}
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
        />;
      })}
    </div>
  );
}

export default AdsAdmin;
