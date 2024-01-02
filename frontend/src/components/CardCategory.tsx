import Link from "next/link";
import cardCategoryStyles from "./CardCategory.module.css";
import { CategoryType } from "../types";
import { useRouter } from "next/router";
import ButtonDelete from "./buttons/ButtonDelete";

export type CardCategoryProps = CategoryType & {
  adsCount: number;
};

export default function CardCategory({
  id,
  name,
  adsCount,
}: CardCategoryProps) {
  const router = useRouter();
  const { basePath } = router;

  return (
    <div className={cardCategoryStyles["card-container"]}>
      <Link
        href={`${basePath}/categories/ads?categoryId=${id}`}
        className={`${cardCategoryStyles["card"]}`}
      >
        <div className={cardCategoryStyles["card-title"]}>{name}</div>
        <p className={cardCategoryStyles["card-ads-count"]}>{`${adsCount} ${
          adsCount == 1 ? "item" : "items"
        }`}</p>
      </Link>
      <ButtonDelete id={id} />
    </div>
  );
}
