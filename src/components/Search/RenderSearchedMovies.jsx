import SearchedMovies from "./SearchedMovies";
import styles from "./Search.module.scss";
import { useSearch } from "../../contexts/SearchProvider";

function RenderSearchedMovies() {
  const { searchedMovies } = useSearch();

  return (
    <ul className={searchedMovies?.length > 0 ? styles.mainSearchCont : ""}>
      {searchedMovies?.map((movies) => (
        <SearchedMovies key={movies.id} movies={movies} />
      ))}
    </ul>
  );
}

export default RenderSearchedMovies;
