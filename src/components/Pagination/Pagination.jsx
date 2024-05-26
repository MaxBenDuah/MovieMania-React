import { useMovieData } from "../../contexts/MovieDataProvider";
import styles from "./Pagination.module.scss";

function Pagination() {
  const { activePage, dispatch } = useMovieData();

  return (
    <div className={styles.paginationCont}>
      <div className={styles.paginationBtnsCont}>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <button
            className={`${styles.paginationBtn} ${
              num === activePage ? styles.activeBtn : ""
            }`}
            onClick={() => {
              dispatch({ type: "movie/getPageNum", payload: num });
              dispatch({ type: "movie/activePage", payload: num });
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
