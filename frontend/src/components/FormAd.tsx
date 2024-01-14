import { mutationCreateAd, mutationUpdateAd } from "../graphgql/ad/mutationAds";
import formAdStyles from "./FormAd.module.css";
import { AdType, CategoryType, MutationAdType, TagType } from "../types";
import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useEffect, useState } from "react";
import { queryCategories } from "../graphgql/category/queryCategories";
import { useRouter } from "next/router";
import { queryAd_Id, queryAds } from "../graphgql/ad/queryAds";
import Image from "next/image";
import { queryTags } from "@/graphgql/tag/queryTags";

type FormAdProps = {
  type: "new" | "update";
  title: string;
};

export default function FormAd({ type, title }: FormAdProps) {
  const router = useRouter();
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const adId = parseInt(params.id);

  //Ads
  const [data, setData] = useState<MutationAdType>({
    title: "",
    description: "",
    owner: "",
    price: 0,
    imgurl: "",
    location: "",
    category: undefined,
    tags: [],
  });

  const { data: dataAd } = useQuery<{ item: AdType }>(queryAd_Id, {
    variables: { id: adId },
    skip: type === "new",
  });
  const ad = dataAd ? dataAd.item : undefined;

  useEffect(() => {
    if (ad) {
      setData({
        title: ad.title,
        description: ad.description,
        owner: ad.owner,
        price: ad.price,
        imgurl: ad.imgurl,
        location: ad.location,
        category: ad.category ? { id: ad.category.id } : undefined,
        tags: ad.tags?.map((tag) => ({ id: tag.id })) || [],
      });
    }
  }, [ad]);

  //FETCH categories
  const {
    data: allCategories,
    error: errorCategories,
    loading: loadingCategories,
  } = useQuery<{ items: CategoryType[] }>(queryCategories);
  const categories = allCategories ? allCategories.items : [];

  //FETCH tags
  const {
    data: allTags,
    error: errorTags,
    loading: loadingTags,
  } = useQuery<{ items: TagType[] }>(queryTags);
  const tags = allTags ? allTags.items : [];

  function handleTagsChange(e: string) {
    const tempTags = data.tags.filter((tag) => tag.id != parseInt(e));
    if (tempTags.length == data.tags.length) {
      setData({
        ...data,
        tags: [...data.tags, { id: parseInt(e) }],
      });
    } else {
      setData({
        ...data,
        tags: tempTags,
      });
    }
    
  }

  //UPDATE or CREATE AD
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
        .catch((err) => console.error(`err : `, err));
    } else if (type === "new") {
      createAd({ variables: { data } })
        .then((res) => {
          router.replace(`/ads/${res.data.item.id}`);
        })
        .catch((err) => console.error(`err : `, err));
    }
  }

  return type == "new" || (type == "update" && ad) ? (
    <div className={formAdStyles["form-ad-container"]}>
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
              placeholder={ad ? ad.title : "Enter title"}
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
              value={data.price || 0}
              onChange={(e) => {
                setData({ ...data, price: Number(e.target.value) });
              }}
              placeholder={ad && data.price ? String(ad.price) : "0"}
            />
          </label>

          {/*IMAGE URL*/}
          <label htmlFor="imgurl">
            <p>Image URL</p>
            <input
              className={`${!data?.imgurl && formAdStyles.gray}`}
              type="text"
              name="imgurl"
              id="imgurl"
              value={data.imgurl || ""}
              onChange={(e) => setData({ ...data, imgurl: e.target.value })}
              placeholder={ad ? ad.imgurl : "https://"}
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
          <label className={loadingCategories ? "loading" : ""}>
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

          {/*TAGS*/}
          <label className={loadingTags ? "loading" : ""}>
            <p>Tags</p>
            {tags && tags.length > 0 ? (
              <>
                <select
                  name="tag"
                  // defaultValue={ad?.tags?.id}
                  onChange={(e) => handleTagsChange(e.target.value)}
                >
                  <option className={formAdStyles.gray}>Choose category</option>
                  {tags &&
                    tags.map((tag: TagType) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                </select>
                {data?.tags?.map((tagData) => {
                  return (
                    <React.Fragment key={tagData.id}>
                      <br />
            
                      -{tags.find((tag) => tagData.id == tag.id)?.name}
                    
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <select disabled>
                <option className={formAdStyles.gray}>...Loading</option>
              </select>
            )}
          </label>
          <button
            className={"button"}
            disabled={loadingCategories}
            type="submit"
          >
            Submit
          </button>
        </form>
        {ad && (
          <Image
            className={formAdStyles.img}
            src={ad.imgurl ? ad.imgurl?.replace("200/150", "400/300") : ""}
            width={600}
            height={600}
            priority
            alt={ad.title}
          />
        )}
      </section>
    </div>
  ) : (
    <>
      <h1>Ad not found</h1>
    </>
  );
}
