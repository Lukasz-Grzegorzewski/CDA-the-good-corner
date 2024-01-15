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

  function onClickPageNumber(index: number) {
    const queryString = router.asPath.replace(/(page=)\d+/, `$1${index}`);
    router.push(`${queryString}`);
  }

  const buttons = [];
  const beginPagination =
    activePage > 3 ? activePage - 3 : activePage - (activePage - 1);
  const endPagination =
    activePage + (maxPages - activePage < 3 ? maxPages - activePage : 3);

  for (let i = beginPagination; i <= endPagination; i++) {
    buttons.push(
      <div
        key={i}
        className={`${buttonsPaginationStyles["link-page"]} ${
          i === Number(page) ? buttonsPaginationStyles["link-page-active"] : ""
        }`}
        onClick={() => onClickPageNumber(i)}
      >
        {i}
      </div>
    );
  }

  return (
    <div className={buttonsPaginationStyles["pages-links-container"]}>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${
          buttonsPaginationStyles["two-arrow-left"]
        } ${activePage === 1 && buttonsPaginationStyles["hide"]} `}
        // takes query url example: /?page=10&limit=20&categories=[] and replace page number on 1
        onClick={() => {
          const queryString = router.asPath.replace(/(page=)\d+/, `$1${1}`);
          router.push(`${queryString}`);
        }}
      >
        {"<<"}
      </button>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${
          buttonsPaginationStyles["one-arrow-left"]
        } ${activePage === 1 && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          // takes query url example: /?page=1&limit=20&categories=[] and replace page number on --1
          const queryString = router.asPath.replace(
            /(page=)\d+/,
            `$1${Number(page) > 1 ? Number(page) - 1 : "1"}`
          );
          router.push(`${queryString}`);
        }}
      >
        {"<"}
      </button>
      {buttons.length > 0 && buttons.map((button) => button)}
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${
          buttonsPaginationStyles["one-arrow-right"]
        } ${activePage === maxPages && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          // takes query url example: /?page=1&limit=20&categories=[] and replace page number on ++1
          const queryString = router.asPath.replace(
            /(page=)\d+/,
            `$1${Number(page) < maxPages ? Number(page) + 1 : maxPages}`
          );
          router.push(`${queryString}`);
        }}
      >
        {">"}
      </button>
      <button
        className={`${buttonsPaginationStyles["arrow"]} ${
          buttonsPaginationStyles["two-arrow-right"]
        } ${activePage === maxPages && buttonsPaginationStyles["hide"]} `}
        onClick={() => {
          // takes query url example: /?page=1&limit=20&categories=[] and replace page number on maxPages
          const queryString = router.asPath.replace(
            /(page=)\d+/,
            `$1${maxPages}`
          );
          router.push(`${queryString}`);
        }}
      >
        {">>"}
      </button>
    </div>
  );
}

export default ButtonsPagination;
