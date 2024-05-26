import styles from "./RenderMoviesByCategory.module.scss";
import Button from "../Button";
import { useMovieData } from "../../contexts/MovieDataProvider";

function MovieListButtons() {
  const { activeBtn, dispatch } = useMovieData();

  function handleActiveBtn(activeBtnStr) {
    dispatch({ type: "movie/activeBtn", payload: activeBtnStr });
  }

  return (
    <div className={styles.categoryBtnCont}>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "now_playing" ? styles.activeBtn : ""
        }`}
        onClick={() => handleActiveBtn("now_playing")}
      >
        Now Playing
      </Button>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "popular" ? styles.activeBtn : ""
        }`}
        onClick={() => handleActiveBtn("popular")}
      >
        Popular
      </Button>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "top_rated" ? styles.activeBtn : ""
        }`}
        onClick={() => handleActiveBtn("top_rated")}
      >
        Top Rated
      </Button>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "upcoming" ? styles.activeBtn : ""
        }`}
        onClick={() => handleActiveBtn("upcoming")}
      >
        Upcoming
      </Button>
    </div>
  );
}

export default MovieListButtons;
