import categoryStyles from "./Category.module.css";
import { useRouter } from "next/router";

import { CategoryType } from "@/types";

export type CategoryProps = CategoryType;

export function Category(props: CategoryType): React.ReactNode {
  const router = useRouter();
  const { basePath } = router;

  return (
    <a
      href={`${basePath}/categories/ads?categoryId=${props.id}`}
      className={categoryStyles["category-navigation-link"]}
    >
      {props.name}
    </a>
  );
}
