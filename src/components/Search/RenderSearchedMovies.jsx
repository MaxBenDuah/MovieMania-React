import { useEffect } from "react";
import SearchedMovies from "./SearchedMovies";
import styles from "./Search.module.scss";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function RenderSearchedMovies({
  query,
  setIsLoading,
  onAddMovieId,
  searchedMovies,
  setSearchedMovies,
}) {
  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with the internet");

          const data = await res.json();
          setSearchedMovies(data.results);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) return;
      getMovies();

      return () => {
        controller.abort();
      };
    },
    [query, setIsLoading, setSearchedMovies]
  );
  return (
    <ul className={searchedMovies.length > 0 ? styles.mainSearchCont : ""}>
      {searchedMovies.map((movies) => (
        <SearchedMovies
          key={movies.id}
          movies={movies}
          onAddMovieId={onAddMovieId}
        />
      ))}
    </ul>
  );
}

export default RenderSearchedMovies;
