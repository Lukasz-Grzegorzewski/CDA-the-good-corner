import updateAdStyles from "./UpdateAd.module.css";
import { useRouter } from "next/router";
import { AdType } from "@/types";
import FormAd from "./FormAd";

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
    id: 1,
    name: "Updated categrory",
  },
  tags: [
    {
      id: 3,
      name: "Tag3",
    },
  ],
};
export default function UpdateAd() {

  // const router = useRouter();
  // const params = Object.fromEntries(new URLSearchParams(location.search));
  // const adId = parseInt(params.id);

  async function updateAd(data: AdType, form: HTMLFormElement) {}

  return (
    <main className={`main-content ${updateAdStyles["new-ad"]}`}>
      <FormAd ad={ad} type="update" title={"Update Ad"} />
    </main>
  );
}
