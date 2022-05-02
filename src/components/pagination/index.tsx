import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

type Props = {
  onSelectPage: (pageNumber: number) => void;
  pageCount: number;
  pageRangeDisplayed: number;
};

const Pagination = ({ pageCount, pageRangeDisplayed, onSelectPage }: Props) => {
  const handleOnPageNumberSelect = (selectedNumber: number) => {
    const selectedPageNumber = selectedNumber+1
    onSelectPage(selectedPageNumber)
  }
  return (
    <div className={styles.wrapper}>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        pageClassName={styles.page}
        previousClassName={styles.previous}
        breakLabel="..."
        marginPagesDisplayed={2}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        onPageChange={(e) => handleOnPageNumberSelect(e.selected)}
      />
    </div>
  );
};

export default Pagination;
