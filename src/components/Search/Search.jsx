import { useState } from "react";
import styles from "./Search.module.scss";

function Search({ query, setQuery, setSearchedMovies }) {
  const [expanded, setExpanded] = useState(false);

  function handleFocus() {
    setExpanded(true);
  }

  function handleBlur() {
    setExpanded(false);
    setSearchedMovies([]);
    setQuery("");
  }

  // className={styles.search}

  return (
    <input
      type="text"
      placeholder="Find movies, shows, and more"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={`${styles.search} ${expanded ? styles.expanded : ""}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export default Search;
