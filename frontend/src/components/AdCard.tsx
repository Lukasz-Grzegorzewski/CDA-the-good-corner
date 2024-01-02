import Link from "next/link";
import adCardStyles from "./AdCard.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { AdType } from "../types";
import useTotalPrice from "../context/totalPriceContext";
import ButtonDelete from "./buttons/ButtonDelete";
import Image from "next/image";

export type AdCardProps = AdType;

export function AdCard({
  id,
  title,
  price,
  imgUrl,
}: AdCardProps): React.ReactNode {
  //BASKET
  const [numberOfArticles, setNumberOfArticles] = useState(1);
  const numberOfArticlesArr: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );
  const { totalPrice, setTotalPrice } = useTotalPrice();
  const router = useRouter();
  const { basePath, pathname } = router;

  // Add to basket handler
  function addHandler(price: number) {
    setTotalPrice(totalPrice + price);
  }

  return (
    <div className={adCardStyles["ad-card-container"]}>
      <Link
        className={adCardStyles["ad-card-link"]}
        href={`${basePath}/ads/${id}`}
      >
        <div className={adCardStyles["img-container"]}>
          <Image
            className={adCardStyles["ad-card-image"]}
            src={imgUrl ? imgUrl : ""}
            width={640}
            height={480}
            priority
            alt="product image"
          />
        </div>
        <div className={adCardStyles["ad-card-text"]}>
          <div className={adCardStyles["ad-card-title"]}>{title}</div>
          <div className={adCardStyles["ad-card-price"]}>{price} €</div>
        </div>
      </Link>
      {!pathname.includes("admin") && (
        <div className={adCardStyles["add-container"]}>
          <button
            className={`${adCardStyles["button-add"]}`}
            onClick={() => addHandler(price * numberOfArticles)}
          >
            <span>+</span>
          </button>
          <select
            className={adCardStyles["select"]}
            name="number-of-articles"
            id=""
            defaultValue={numberOfArticlesArr[0]}
            onChange={(e) => setNumberOfArticles(() => Number(e.target.value))}
          >
            {numberOfArticlesArr.map((number) => (
              <option
                className={adCardStyles["option"]}
                key={number}
                value={number}
              >
                {number}
              </option>
            ))}
          </select>
        </div>
      )}

      <ButtonDelete id={id} />
    </div>
  );
}
