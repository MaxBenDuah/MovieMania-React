import { createContext, useContext, useEffect, useReducer } from "react";

const KEY = "9b22856c339406c84c600cdd45f5d532";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchContext = createContext();

const initialState = {
  query: "",
  expanded: false,
  searchedMovies: [],
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "search/query":
      return { ...state, query: action.payload };
    case "search/expand":
      return { ...state, expanded: true };
    case "search/blur":
      return { ...state, query: "", expanded: false };
    case "loading":
      return { ...state, isLoading: true };
    case "notLoading":
      return { ...state, isLoading: false };
    case "movies/loaded":
      return { ...state, searchedMovies: action.payload };
    case "search/close":
      return { ...state, searchedMovies: [] };
    default:
      throw new Error("Unknown action type");
  }
}

function SearchProvider({ children }) {
  const [{ query, expanded, searchedMovies }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovies() {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(
            `${BASE_URL}/search/movie?query=${query}&api_key=${KEY}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with the internet");

          const data = await res.json();
          dispatch({ type: "movies/loaded", payload: data.results });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
          }
        } finally {
          dispatch({ type: "notLoading" });
        }
      }

      if (query.length < 3) return;
      getMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(function () {
    function closeSearchMovies() {
      dispatch({ type: "search/close" });
    }

    document.addEventListener("click", closeSearchMovies);

    return () => {
      document.removeEventListener("click", closeSearchMovies);
    };
  }, []);

  return (
    <SearchContext.Provider
      value={{ query, expanded, dispatch, searchedMovies }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error("SearchContext was used outside of the SearchProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SearchProvider, useSearch };
