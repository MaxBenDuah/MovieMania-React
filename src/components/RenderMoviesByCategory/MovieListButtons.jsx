import { useEffect, useState } from "react";
import styles from "./RenderMoviesByCategory.module.scss";
import Button from "../Button";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function MovieListButtons({ pagNum, setMovies, setIsLoading }) {
  const [str, setStr] = useState("now_playing");

  function handleInput(str) {
    setStr(str);
  }

  useEffect(
    function () {
      async function getMov() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${str}?language=en-US&page=${pagNum}&api_key=${KEY}`
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
    [pagNum, str, setMovies, setIsLoading]
  );

  return (
    <div className={styles.categoryBtnCont}>
      {/* <Button
        className={styles.categoryBtn}
        onClick={() => handleInput("trending")}
      >
        Trending
      </Button> */}
      <Button
        className={styles.categoryBtn}
        onClick={() => handleInput("now_playing")}
      >
        Now Playing
      </Button>
      <Button
        className={styles.categoryBtn}
        onClick={() => handleInput("popular")}
      >
        Popular
      </Button>
      <Button
        className={styles.categoryBtn}
        onClick={() => handleInput("top_rated")}
      >
        Top Rated
      </Button>
      <Button
        className={styles.categoryBtn}
        onClick={() => handleInput("upcoming")}
      >
        Upcoming
      </Button>
    </div>
  );
}

export default MovieListButtons;
