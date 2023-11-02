import adStyles from "./[id].module.css";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonDelete from "@/components/buttons/ButtonDelete";

const ad = {
  id: 3,
  title: "Super car",
  description: "2024",
  owner: "Ado",
  price: 11000,
  imgUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYXA2vHXJb-i052xlABBOhmIjd2dTYxHOEg&usqp=CAU",
  location: "Lyon",
  category: {
    id: "1",
    name: "Updated categrory",
  },
  tags: [
    {
      id: "3",
      name: "Tag3",
    },
  ],
};


export default function Ad() {
  const router = useRouter();

  return (
    <Layout title="Ad">
      {ad && (
        <main className="main-content">
          <h2 className={adStyles["ad-details-title"]}>{ad.title}</h2>
          <section className={adStyles["ad-details"]}>
            <div className={adStyles["ad-details-image-container"]}>
              <img className={adStyles["ad-details-image"]} src={ad.imgUrl} />
            </div>
            <div className={adStyles["ad-details-info"]}>
              <div className={adStyles["ad-details-price"]}>{ad.price}€</div>
              <div className={adStyles["ad-details-description"]}>
                {ad.description}
              </div>
              <hr className="separator" />
              <div className={adStyles["ad-details-owner"]}>
                Annoncée publiée par <b>{ad.owner}</b>{" "}
                {/* {String(ad.createdAt).split("T")[0]}
                {" at "}
                {String(ad.createdAt).split("T")[1].split(".")[0]}. */}
              </div>
              <Link href={`/ads/update?id=${ad.id}`} className="button">
                Update Ad
              </Link>
              <Link href={`mailto:${ad.owner}`} className="button">
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
              <ButtonDelete id={ad.id}/>
            </div>
          </section>
        </main>
      )}
    </Layout>
  );
}
