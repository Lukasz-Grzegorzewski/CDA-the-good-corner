import Link from "next/link";
import cardCategoryStyles from "./CardCategory.module.css";
import { CategoryType } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import ButtonDelete from "../buttons/ButtonDelete";

export type CardCategoryProps = CategoryType & {
  adsCount: number;
  callCustomFetch: Function;
};

export default function CardCategory({
  id,
  name,
  adsCount,
  callCustomFetch,
}: CardCategoryProps) {

  const router = useRouter();
  const { basePath } = router;

  return (
    <Link
      href={`${basePath}/categories/ads?categoryId=${id}`}
      className={cardCategoryStyles["card"]}
    >
      <div className={cardCategoryStyles["card-title"]}>{name}</div>
      <p className={cardCategoryStyles["card-ads-count"]}>{`${adsCount} ${
        adsCount == 1 ? "item" : "items"
      }`}</p>
      <ButtonDelete url="/categories" id={id} reFetch={callCustomFetch} />
    </Link>
  );
}
