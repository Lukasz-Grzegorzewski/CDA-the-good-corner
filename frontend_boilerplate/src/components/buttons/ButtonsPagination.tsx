import buttonsPaginationStyles from "./buttonsPagination.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

type ButtonsPaginationProps = {
  count: number;
  pageQuery: string;
  limitQuery: string;
};

function ButtonsPagination({
  count,
  pageQuery,
  limitQuery,
}: ButtonsPaginationProps) {
  
  const router = useRouter();
  const maxPages = Math.ceil(count / Number(limitQuery));
  const buttons = [];
  for (let i = 1; i <= maxPages; i++) {
    buttons.push(
      <Link
        key={i}
        href={`/?page=${i}&limit=${limitQuery}`}
        className={`${buttonsPaginationStyles["link-page"]} ${
          i === Number(pageQuery)
            ? buttonsPaginationStyles["link-page-active"]
            : ""
        }`}
        onClick={() => {
          router.push(`/?page=${i}&limit=${limitQuery}`);
        }}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className={buttonsPaginationStyles["pages-links-container"]}>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["two-arrow-left"]}`}
        onClick={() => {
          router.push(`/?page=1&limit=${limitQuery}`);
        }}
      >
        {"<<"}
      </button>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["one-arrow-left"]}`}
        onClick={() => {
          router.push(
            `/?page=${
              Number(pageQuery) > 1 ? Number(pageQuery) - 1 : "1"
            }&limit=${limitQuery}`
          );
        }}
      >
        {"<"}
      </button>
      {buttons.length > 0 && buttons.map((button) => button)}
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["one-arrow-right"]}`}
        onClick={() => {
          router.push(
            `/?page=${
              Number(pageQuery) < maxPages ? Number(pageQuery) + 1 : maxPages
            }&limit=${limitQuery}`
          );
        }}
      >
        {">"}
      </button>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["two-arrow-right"]}`}
        onClick={() => {
          router.push(`/?page=${maxPages}&limit=${limitQuery}`);
        }}
      >
        {">>"}
      </button>
    </div>
  );
}

export default ButtonsPagination;
