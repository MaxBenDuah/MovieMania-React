import styles from "./Search.module.scss";
import { useSearch } from "../../contexts/SearchProvider";

function Search() {
  const { query, dispatch, expanded } = useSearch();

  function handleFocus() {
    dispatch({ type: "search/expand" });
  }

  function handleBlur() {
    dispatch({ type: "search/blur" });
  }

  return (
    <input
      type="text"
      placeholder="Find movies, shows, and more"
      value={query}
      onChange={(e) =>
        dispatch({ type: "search/query", payload: e.target.value })
      }
      className={`${styles.search} ${expanded ? styles.expanded : ""}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export default Search;
