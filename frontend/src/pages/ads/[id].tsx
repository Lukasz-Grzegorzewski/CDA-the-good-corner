import adStyles from "./[id].module.css";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import { AdType } from "../../types";
import { queryAd_Id } from "../../graphgql/ad/queryAds";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Ad() {
  const router = useRouter();

  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (router.query.id) {
      setId(parseInt(router?.query?.id as string));
    }
  }, [router.query.id]);

  const { data, error, loading } = useQuery<{ item: AdType }>(queryAd_Id, {
    variables: { id },
    skip: id === undefined,
  });
  const ad = data ? data.item : null;


  /* TODO_1 time display. calculaltion based on timezone*/
  // const clientOptions = {
  //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   language: navigator.language || "en-GB",
  // };

  return (
    <Layout title={`Ad: ${ad ? ad.title : "not found"}`}>
      <main className="main-content">
        {!ad ? (
          <h2 className={adStyles["ad-details-title"]}>
            {loading ? "Loading..." : error && "Ad not found"}
          </h2>
        ) : (
          <>
            <h2 className={adStyles["ad-details-title"]}>{ad.title}</h2>
            <section className={adStyles["ad-details"]}>
              <div className={adStyles["ad-details-image-container"]}>
                <Image
                  className={adStyles["ad-details-image"]}
                  src={ad.imgurl ? ad.imgurl?.replace("200/150", "400/300") : ""}
                  width={600}
                  height={600}
                  priority
                  alt={ad.title}
                />
              </div>
              <div className={adStyles["ad-details-info"]}>
                <div className={adStyles["ad-details-price"]}>{ad.price}€</div>
                <div className={adStyles["ad-details-description"]}>
                  {ad.description}
                </div>
                <hr className="separator" />
                <div className={adStyles["ad-details-owner"]}>
                  Annoncée publiée par <b>{ad.owner}</b>{" "}
                  {/*TODO_1 time display. calculaltion based on timezone*/}
                 
                </div>
                <div> {String(ad.createdAt).split("T")[0]}</div>
                <Link
                  href={{
                    pathname: "/ads/edit",
                    query: { id: ad.id },
                  }}
                  scroll={false}
                  className="button"
                >
                  Update Ad
                </Link>
                <Link href={`mailto:${ad.owner}`} className={`button ${adStyles["ad-details-email"]}`}>
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                    style={{
                      stroke: "currentcolor",
                      strokeWidth: "2.5",
                      fill: "none",
                    }}
                  >
                    <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
                  </svg>
                  Envoyer un email
                </Link>
                <ButtonDelete id={ad.id} />
              </div>
            </section>
          </>
        )}
      </main>
    </Layout>
  );
}
