import categoryStyles from "./Category.module.css";
import { useRouter } from "next/router";

import { CategoryType } from "../types";
import Link from "next/link";

export type CategoryProps = CategoryType;

export function Category(props: CategoryType): React.ReactNode {
  const router = useRouter();
  const { basePath } = router;

  return (
    <Link
      href={`${basePath}/ads/category/${props.id}`}
      className={categoryStyles["category-navigation-link"]}
    >
      {props.name}
    </Link>
  );
}
