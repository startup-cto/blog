import { Link } from "../../elements/Link/Link";
import { HorizontalList } from "../../elements/HorizontalList/HorizontalList";

interface Props {
  pageCount: number;
  currentPage: number;
}

export function Pagination({ pageCount, currentPage }: Props) {
  const pages = Array.from({ length: pageCount }).map((_, i) => i + 1);
  return (
    <HorizontalList>
      {currentPage > 1 && <Link href={`/page/${currentPage - 1}`}>{"<"}</Link>}
      {pages.map((page) => (
        <Link
          key={page}
          href={`/page/${page}`}
          color={page === currentPage ? "text" : "accent"}
        >
          {page}
        </Link>
      ))}
      {currentPage < pageCount && (
        <Link href={`/page/${currentPage + 1}`}>{">"}</Link>
      )}
    </HorizontalList>
  );
}
