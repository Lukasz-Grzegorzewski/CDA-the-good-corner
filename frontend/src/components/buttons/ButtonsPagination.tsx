import buttonsPaginationStyles from "./buttonsPagination.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

type ButtonsPaginationProps = {
  count: number;
  page: string;
  limit: string;
};

function ButtonsPagination({ count, page, limit }: ButtonsPaginationProps) {
  const router = useRouter();

  const maxPages = Math.ceil(count / Number(limit));
  const activePage = Number(router.query.page) || 1;

  const buttons = [];
  const beginPagination =
    activePage > 3 ? activePage - 3 : activePage - (activePage - 1);
  const endPagination =
    activePage + (maxPages - activePage < 3 ? maxPages - activePage : 3);

  for (let i = beginPagination; i <= endPagination; i++) {
    buttons.push(
      <Link
        key={i}
        href={`/?page=${i}&limit=${limit}`}
        className={`${buttonsPaginationStyles["link-page"]} ${
          i === Number(page) ? buttonsPaginationStyles["link-page-active"] : ""
        }`}
        onClick={() => {
          router.push(`/?page=${i}&limit=${limit}`);
        }}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className={buttonsPaginationStyles["pages-links-container"]}>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["two-arrow-left"]} ${activePage === 1 && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          router.push(`/?page=1&limit=${limit}`);
        }}
      >
        {"<<"}
      </button>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["one-arrow-left"]} ${activePage === 1 && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          router.push(
            `/?page=${Number(page) > 1 ? Number(page) - 1 : "1"}&limit=${limit}`
          );
        }}
      >
        {"<"}
      </button>
      {buttons.length > 0 && buttons.map((button) => button)}
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["one-arrow-right"]} ${activePage === maxPages && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          router.push(
            `/?page=${
              Number(page) < maxPages ? Number(page) + 1 : maxPages
            }&limit=${limit}`
          );
        }}
      >
        {">"}
      </button>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${buttonsPaginationStyles["two-arrow-right"]} ${activePage === maxPages && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          router.push(`/?page=${maxPages}&limit=${limit}`);
        }}
      >
        {">>"}
      </button>
    </div>
  );
}

export default ButtonsPagination;
