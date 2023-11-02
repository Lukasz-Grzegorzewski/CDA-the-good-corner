import adminStyles from "./Admin.module.css";
import { useSearchParams } from "next/navigation";
import CategoriesAdmin from "./CategoriesAdmin";
import AdsAdmin from "./AdsAdmin";
import TagsAdmin from "./TagsAdmin";
import { AdType, CategoryType } from "@/types";
import { useFetchCustom } from "@/gql_requests/fetchData";

// DATA
const ads = [
  {
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
  },
  {
    id: 4,
    title: "Super car",
    description: "2024",
    owner: "Ado",
    price: 4000,
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
  },
];
const categories: CategoryType[] = [
  { id: 1, name: "Bikes" },
  { id: 2, name: "Cars" },
];
const tags: CategoryType[] = [
  { id: 1, name: "Tag 1" },
  { id: 2, name: "Tag 2" },
];

export default function Admin() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("item") || "ads";

  useFetchCustom(`admin/${queryParam}`);

  return (
    <section className={adminStyles["admin-content"]}>
      {queryParam === "ads" && <AdsAdmin ads={ads} />}
      {queryParam === "categories" && (
        <CategoriesAdmin categories={categories} />
      )}
      {queryParam === "tags" && <TagsAdmin tags={tags} />}
    </section>
  );
}
