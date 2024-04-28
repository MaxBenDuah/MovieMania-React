import { useEffect, useState } from "react";
import styles from "./RenderMoviesByCategory.module.scss";
import Button from "../Button";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function MovieListButtons({ pagNum, setMovies, setIsLoading }) {
  const [activeBtn, setActiveBtn] = useState("now_playing");

  function handleInput(str) {
    setActiveBtn(str);
  }

  useEffect(
    function () {
      async function getMov() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${activeBtn}?language=en-US&page=${pagNum}&api_key=${KEY}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching data");

          const data = await res.json();

          setMovies(data.results);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMov();
    },
    [pagNum, activeBtn, setMovies, setIsLoading]
  );

  return (
    <div className={styles.categoryBtnCont}>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "now_playing" ? styles.activeBtn : ""
        }`}
        onClick={() => handleInput("now_playing")}
      >
        Now Playing
      </Button>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "popular" ? styles.activeBtn : ""
        }`}
        onClick={() => handleInput("popular")}
      >
        Popular
      </Button>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "top_rated" ? styles.activeBtn : ""
        }`}
        onClick={() => handleInput("top_rated")}
      >
        Top Rated
      </Button>
      <Button
        className={`${styles.categoryBtn} ${
          activeBtn === "upcoming" ? styles.activeBtn : ""
        }`}
        onClick={() => handleInput("upcoming")}
      >
        Upcoming
      </Button>
    </div>
  );
}

export default MovieListButtons;
