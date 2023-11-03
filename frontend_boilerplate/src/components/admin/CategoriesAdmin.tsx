import adminStyles from "./CategoriesAdmin.module.css";
import CardCategory, { CardCategoryProps } from "../CardCategory";
import { CategoryType } from "@/types";

type CategoriesAdminProps = {
  categories: CategoryType[];
}

export default function CategoriesAdmin({categories}: CategoriesAdminProps) {
  return (
    <section className={adminStyles["category-cards-container"]}>
      {categories &&
        categories.map((category: CategoryType) => (
          <CardCategory
            key={category.id}
            name={category.name}
            id={category.id}
            adsCount={10}
          />
        ))}
    </section>
  );
}
