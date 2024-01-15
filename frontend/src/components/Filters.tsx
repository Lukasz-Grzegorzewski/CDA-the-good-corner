import filtersStyles from "./Filters.module.css";
import { useQuery } from "@apollo/client";
import { CategoryType, TagType } from "@/types";
import { queryCategories } from "@/graphgql/category/queryCategories";
import { queryTags } from "@/graphgql/tag/queryTags";
import { useRouter } from "next/router";

type FiltersProps = {
  isFilters: boolean;
  categoriesArray: number[];
};

export default function Filters({ categoriesArray, isFilters }: FiltersProps) {
  const router = useRouter();

  const {
    data: dataCategories,
    error: errorCategories,
    loading: loadingCategories,
  } = useQuery<{ items: CategoryType[] }>(queryCategories);

  const {
    data: dataTags,
    error: errorTags,
    loading: loadingTags,
  } = useQuery<{ items: TagType[] }>(queryTags);

  function onSubmit() {}
  function onChangeCategory(category: CategoryType) {
    const indexCategory = categoriesArray.indexOf(Number(category.id));

    indexCategory >= 0
      ? categoriesArray.splice(indexCategory, 1)
      : categoriesArray.push(category.id);

    // update query: "page" to 1 and query: "categories" to chosen categories(categoriesArray)
    router.push(
      `${router.asPath.replace(
        /(page=)\d+|(\bcategories=)\[.*?\]/g,
        (match, p1, p2) => {
          return p1 ? `${p1}${1}` : `${p2}[${categoriesArray}]`;
        }
      )}`
    );
  }

  return (
    <form onSubmit={onSubmit} className={filtersStyles["filters-component"]}>
      <div className={filtersStyles["filter-section-container"]}>
        <h2 className={filtersStyles["filter-title"]}>Catégories</h2>
        {dataCategories ? (
          dataCategories.items.map((category) => (
            <div
              key={category.id}
              className={filtersStyles["input-label-containers"]}
            >
              <input
                className={filtersStyles["inputs"]}
                type="checkbox"
                id={category.name}
                onChange={() => onChangeCategory(category)}
              />
              <label
                className={filtersStyles["labels"]}
                htmlFor={category.name}
              >
                {category.name}
              </label>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className={filtersStyles["filter-section-container"]}>
        <h2 className={filtersStyles["filter-title"]}>Tags</h2>
        {dataTags ? (
          dataTags.items.map((tag) => (
            <div
              key={tag.id}
              className={filtersStyles["input-label-containers"]}
            >
              <input
                className={filtersStyles["inputs"]}
                type="checkbox"
                id={tag.name}
              />
              <label className={filtersStyles["labels"]} htmlFor={tag.name}>
                {tag.name}
              </label>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <button
        className={`${filtersStyles["btn-submit"]} ${
          isFilters ? filtersStyles["hide"] : ""
        }`}
        type="submit"
      >
        Filter
      </button>
    </form>
  );
}
