import styles from "./styles.module.css";

export type paginationProps = {
  totalPages: number;
  currentPage: number;
  handleNextPageClick: () => void;
  handlePreviousPageClick: () => void;
  handlePageClick: (pageNumber: number) => void;
};

export default function Pagination({totalPages, currentPage, handleNextPageClick, handlePreviousPageClick, handlePageClick,}: paginationProps): JSX.Element {
  return (
    <div className={styles.pagination}>
      <button onClick={handlePreviousPageClick} className={styles.arrow}>
        {"<"}
      </button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            onClick={() => handlePageClick(index + 1)}
            className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.activePageNumber : ""}`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handleNextPageClick} className={styles.arrow}>
        {">"}
      </button>
    </div>
  );
}

