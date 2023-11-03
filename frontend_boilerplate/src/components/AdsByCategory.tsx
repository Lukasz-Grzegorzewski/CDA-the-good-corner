import adsByCategory from "./AdsByCategory.module.css";
import { useRouter } from "next/router";
import { AdCard } from "./AdCard";
// import { useFetchCustom } from "@/gql_requests/fetchData";

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
      name: "Cars",
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
    price: 3200,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYXA2vHXJb-i052xlABBOhmIjd2dTYxHOEg&usqp=CAU",
    location: "Lyon",
    category: {
      id: 1,
      name: "Cars",
    },
    tags: [
      {
        id: 3,
        name: "Tag3",
      },
    ],
  },
];

export default function AdsByCategory({id}: {id: number}) {

  const router = useRouter();
  // const { categoryId } = router.query;
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const categoryId = params.categoryId

  // useFetchCustom(`/ads?categoryId=${categoryId}`);

  return (
    <main className="main-content">
      <h2>{ads[0]?.category?.name}</h2>
      <section className={adsByCategory["recent-ads"]}>
        {ads.length > 0 &&
          ads.map((item) => (
            <div key={item.id}>
              <AdCard
                id={item.id}
                title={item.title}
                description={item.description}
                owner={item.owner}
                price={item.price}
                imgUrl={item.imgUrl}
                location={item.location}
                category={item.category}
              />
            </div>
          ))}
      </section>
    </main>
  );
}
