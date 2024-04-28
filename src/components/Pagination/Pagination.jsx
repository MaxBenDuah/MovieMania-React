import styles from "./Pagination.module.scss";

function Pagination({ setPageNum, activePage, setActivePage }) {
  return (
    <div className={styles.paginationCont}>
      <div className={styles.paginationBtnsCont}>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <button
            className={`${styles.paginationBtn} ${
              num === activePage ? styles.activeBtn : ""
            }`}
            onClick={() => {
              setPageNum(num);
              setActivePage(num);
            }}
            key={num}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
