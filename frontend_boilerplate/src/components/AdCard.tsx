import Link from "next/link";
import adCardStyles from "./AdCard.module.css";
import { useRouter } from "next/router";
import { API_URL } from "@/config";
import axios from "axios";
import { useState } from "react";
import { AdType } from "@/types";
import useTotalPrice from "@/context/totalPriceContext";
import ButtonDelete from "./buttons/ButtonDelete";

export type AdCardProps = AdType & {
  callCustomFetch: () => void;
};

export function AdCard({
  id,
  title,
  price,
  imgUrl,
  callCustomFetch,
}: AdCardProps): React.ReactNode {
  const [isSucces, setIsSucces] = useState(false);
  const [isError, setIsError] = useState(false);

  const [numberOfArticles, setNumberOfArticles] = useState(1);
  const numberOfArticlesArr: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );
  const { totalPrice, setTotalPrice } = useTotalPrice();

  const router = useRouter();
  const { basePath, pathname } = router;

  async function deleteHandler() {
    try {
      const result = await axios.delete(API_URL + `/ads/${id}`);
      if (result.status === 204) {
        setIsSucces(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1000);
    } finally {
      setTimeout(() => {
        setIsSucces(false);
        callCustomFetch();
      }, 1000);
    }
  }

  function addHandler(price: number) {
    setTotalPrice(totalPrice + price);
  }

  return (
    <div className={adCardStyles["ad-card-container"]}>
      <Link
        className={adCardStyles["ad-card-link"]}
        href={`${basePath}/ads/${id}`}
      >
        <img className={adCardStyles["ad-card-image"]} src={imgUrl} />
        <div className={adCardStyles["ad-card-text"]}>
          <div className={adCardStyles["ad-card-title"]}>{title}</div>
          <div className={adCardStyles["ad-card-price"]}>{price} €</div>
        </div>
      </Link>
      {!pathname.includes("admin") && (
        <div className={adCardStyles["add-container"]}>
          <button
            className={`button ${adCardStyles["button-add"]}`}
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

      <ButtonDelete url="/ads" id={id} reFetch={callCustomFetch} />
    </div>
  );
}
