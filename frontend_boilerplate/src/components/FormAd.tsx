import { mutationCreateAd, mutationUpdateAd } from "@/graphgql/ad/mutationAds";
import formAdStyles from "./FormAd.module.css";
import { AdType, CategoryType, MutationAdType } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { queryCategories } from "@/graphgql/category/queryCategories";
import { useRouter } from "next/router";
import { queryAd_Id, queryAds } from "@/graphgql/ad/queryAds";

type FormAdProps = {
  ad?: AdType;
  type: "new" | "update";
  title: string;
};

export default function FormAd({ ad, type, title }: FormAdProps) {
  const [data, setData] = useState<MutationAdType>({
    title: ad?.title || "",
    description: ad?.description || "",
    owner: ad?.owner || "",
    price: ad?.price || 0,
    imgUrl: ad?.imgUrl || "",
    location: ad?.location || "",
    category: ad?.category ? { id: ad.category.id } : undefined,
    tags: ad?.tags?.map((tag) => ({ id: tag.id })) || [],
  });
  const router = useRouter();

  //FETCH categories
  const {
    data: allCategories,
    error,
    loading,
  } = useQuery<{ items: CategoryType[] }>(queryCategories);
  const categories = allCategories ? allCategories.items : [];

  //UPDATE ad
  const [createAd] = useMutation(mutationCreateAd, {
    refetchQueries: [queryAds],
  });
  const [updateAd] = useMutation(mutationUpdateAd, {
    refetchQueries: [queryAds, queryAd_Id],
  });

  function onSubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (type === "update" && ad) {
      updateAd({ variables: { id: ad.id, data } })
        .then((res) => {
          router.push(`/ads/${res.data.item.id}`);
        })
        .catch((err) => console.log(`err : `, err));
    } else if (type === "new") {
      createAd({ variables: { data } })
        .then((res) => {
          router.replace(`/ads/${res.data.item.id}`);
        })
        .catch((err) => console.log(`err : `, err));
    }
  }
  console.log(type == "new" || (type == "update" && ad));

  return type == "new" || (type == "update" && ad) ? (
    <>
      <h1 className="title">{title}</h1>
      <section className={formAdStyles["form-section"]}>
        <form onSubmit={onSubmitHandler} className={`${formAdStyles.form}`}>
          {/*TITLE*/}
          <label htmlFor="title">
            <p className="obligatory-field">Title</p>
            <input
              className={`${!data?.title && formAdStyles.gray}`}
              type="text"
              name="title"
              id="title"
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder={ad ? ad.description : "Enter title"}
            />
          </label>

          {/*DESCRIPTION*/}
          <label htmlFor="description">
            <p>Description</p>
            <textarea
              className={`${!data?.description && formAdStyles.gray}`}
              name="description"
              id="description"
              value={data.description || ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder={ad ? ad.description : "Enter description"}
            />
          </label>

          {/*OWNER*/}
          <label htmlFor="owner">
            <p className="obligatory-field">Owner</p>
            <input
              className={`${!data?.owner && formAdStyles.gray}`}
              type="text"
              name="owner"
              id="owner"
              value={data.owner || ""}
              onChange={(e) => setData({ ...data, owner: e.target.value })}
              placeholder={ad ? ad.owner : "example@email.com"}
            />
          </label>

          {/*PRICE*/}
          <label htmlFor="price">
            <p className="obligatory-field">Price</p>
            <input
              className={`${
                !data?.price && data?.price !== 0 && formAdStyles.gray
              }`}
              type="number"
              name="price"
              id="price"
              value={data.price || ""}
              onChange={(e) => {
                setData({ ...data, price: Number(e.target.value) });
              }}
              placeholder={ad && data.price ? String(ad.price) : "0"}
            />
          </label>

          {/*IMAGE URL*/}
          <label htmlFor="imgUrl">
            <p>Image URL</p>
            <input
              className={`${!data?.imgUrl && formAdStyles.gray}`}
              type="text"
              name="imgUrl"
              id="imgUrl"
              value={data.imgUrl || ""}
              onChange={(e) => setData({ ...data, imgUrl: e.target.value })}
              placeholder={ad ? ad.imgUrl : "https://"}
            />
          </label>

          {/*LOCATION*/}
          <label htmlFor="location">
            <p>Location</p>
            <input
              className={`${!data?.location && formAdStyles.gray}`}
              type="text"
              name="location"
              id="location"
              value={data.location || ""}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder={ad ? ad.location : "Enter location"}
            />
          </label>

          {/*CATEGORY*/}
          <label className={loading ? "loading" : ""}>
            <p className="obligatory-field">Category</p>
            {categories && categories.length > 0 ? (
              <>
                <select
                  name="category"
                  defaultValue={ad?.category?.id}
                  onChange={(e) =>
                    setData({
                      ...data,
                      category: { id: parseInt(e.target.value) },
                    })
                  }
                >
                  <option className={formAdStyles.gray}>Choose category</option>
                  {categories &&
                    categories.map((category: CategoryType) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </>
            ) : (
              <select disabled>
                <option className={formAdStyles.gray}>...Loading</option>
              </select>
            )}
          </label>
          <button className={"button"} disabled={loading} type="submit">
            Submit
          </button>
        </form>
        {ad && (
          <img className={formAdStyles.img} src={ad.imgUrl} alt={ad.title} />
        )}
      </section>
    </>
  ) : (
    <>
      <h1>Ad not found</h1>
    </>
  );
}
