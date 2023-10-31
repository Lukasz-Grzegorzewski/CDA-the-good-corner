import formAdStyles from "./FormAd.module.css";

import { useCustomFetch } from "@/axiosRequests/fetchData";

import { AdType, CategoryType } from "@/types";
import { FormEvent, useEffect, useState } from "react";

type FormAdProps = {
  id?: string | null;
  title: string;
  apiCall: Function;
  isSucces: boolean;
  ad?: AdType;
  category?: number;
  type: "new" | "update";
};

export default function FormAd({
  apiCall,
  title,
  isSucces,
  ad,
  type,
}: FormAdProps) {
  const [fields, setFields] = useState({
    title: ad?.title,
    description: ad?.description,
    owner: ad?.owner,
    price: ad?.price,
    imgUrl: ad?.imgUrl,
    location: ad?.location,
    category: ad?.category?.id,
  });

  const {
    APIData: categories,
    isLoading: isLoadingCategories,
    error: errorGetCategories,
    isSucces: isSuccesGetCategories,
  } = useCustomFetch("/categories");

  useEffect(() => {
    if (ad) {
      setFields((prev) => ({
        ...prev,
        title: ad.title,
        description: ad.description,
        owner: ad?.owner,
        price: ad.price,
        imgUrl: ad?.imgUrl,
        location: ad?.location,
        category: ad?.category?.id,
      }));
    }
  }, [ad, categories]);

  function onSubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as unknown as AdType;

    if (!data.price) {
      data.price = 0;
    }

    apiCall(data, form);
  }

  return type == "new" || (type == "update" && ad) ? (
    <>
      <h1 className="title">{title}</h1>
      <section className={formAdStyles["form-section"]}>
        <form onSubmit={onSubmitHandler} className={`${formAdStyles.form}`}>
          {/*TITLE*/}
          <label htmlFor="title">
            <p className="obligatory-field">Title</p>
            <input
              className={`${!fields?.title && formAdStyles.gray}`}
              type="text"
              name="title"
              id="title"
              value={fields.title || ""}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
              placeholder={ad ? ad.description : "Enter title"}
            />
          </label>

          {/*DESCRIPTION*/}
          <label htmlFor="description">
            <p>Description</p>
            <textarea
              className={`${!fields?.description && formAdStyles.gray}`}
              name="description"
              id="description"
              value={fields.description || ""}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
              placeholder={ad ? ad.description : "Enter description"}
            />
          </label>

          {/*OWNER*/}
          <label htmlFor="owner">
            <p className="obligatory-field">Owner</p>
            <input
              className={`${!fields?.owner && formAdStyles.gray}`}
              type="text"
              name="owner"
              id="owner"
              value={fields.owner || ""}
              onChange={(e) => setFields({ ...fields, owner: e.target.value })}
              placeholder={ad ? ad.owner : "example@email.com"}
            />
          </label>

          {/*PRICE*/}
          <label htmlFor="price">
            <p className="obligatory-field">Price</p>
            <input
              className={`${
                !fields?.price && fields?.price !== 0 && formAdStyles.gray
              }`}
              type="number"
              name="price"
              id="price"
              value={fields.price || ""}
              onChange={(e) => {
                setFields({ ...fields, price: Number(e.target.value) });
              }}
              placeholder={ad && fields.price ? String(ad.price) : "0"}
            />
          </label>

          {/*IMAGE URL*/}
          <label htmlFor="imgUrl">
            <p>Image URL</p>
            <input
              className={`${!fields?.imgUrl && formAdStyles.gray}`}
              type="text"
              name="imgUrl"
              id="imgUrl"
              value={fields.imgUrl || ""}
              onChange={(e) => setFields({ ...fields, imgUrl: e.target.value })}
              placeholder={ad ? ad.imgUrl : "https://"}
            />
          </label>

          {/*LOCATION*/}
          <label htmlFor="location">
            <p>Location</p>
            <input
              className={`${!fields?.location && formAdStyles.gray}`}
              type="text"
              name="location"
              id="location"
              value={fields.location || ""}
              onChange={(e) =>
                setFields({ ...fields, location: e.target.value })
              }
              placeholder={ad ? ad.location : "Enter location"}
            />
          </label>

          {/*CATEGORY*/}
          <label className={isLoadingCategories ? "loading" : ""}>
            <p className="obligatory-field">Category</p>
            {categories.length > 0 ? (
              <>
                <select
                  name="category"
                  defaultValue={ad?.category?.id}
                  onChange={(e) =>
                    setFields({ ...fields, category: Number(e.target.value) })
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
          <button
            className={
              isSucces ? `button ${formAdStyles["disabled-button"]}` : "button"
            }
            type="submit"
          >
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
      <h1>
        Ad not found
        <br />
        404
      </h1>
    </>
  );
}
