import updateAdStyles from "./EditAd.module.css";
import { useRouter } from "next/router";
import { AdType } from "@/types";
import FormAd from "./FormAd";
import { queryAd_Id } from "@/graphgql/ad/queryAds";
import { useQuery } from "@apollo/client";

// const ad = {
//   id: 3,
//   title: "Super car",
//   description: "2024",
//   owner: "Ado",
//   price: 11000,
//   imgUrl:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYXA2vHXJb-i052xlABBOhmIjd2dTYxHOEg&usqp=CAU",
//   location: "Lyon",
//   createdAt: "2023-11-03 12:32:10",
//   category: {
//     id: 1,
//     name: "Updated categrory",
//   },
//   tags: [
//     {
//       id: 3,
//       name: "Tag3",
//     },
//   ],
// };

export default function EditAd() {
  const router = useRouter();
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const adId = parseInt(params.id);

  const { data, error, loading } = useQuery<{ item: AdType }>(queryAd_Id, {
    variables: { id: adId },
    skip: adId === undefined,
  });
  const ad = data ? data.item : undefined;

  return (
    <main className={`main-content ${updateAdStyles["new-ad"]}`}>
      <FormAd ad={ad} type="update" title={"Update Ad"} />
    </main>
  );
}
