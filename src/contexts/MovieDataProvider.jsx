import { createContext, useContext, useEffect, useReducer } from "react";

const KEY = "9b22856c339406c84c600cdd45f5d532";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDataContext = createContext();

const initialState = {
  pageNum: 1,
  activePage: 1,
  activeBtn: "now_playing",
  isLoading: false,
  movies: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "movie/getPageNum":
      return { ...state, pageNum: action.payload };
    case "movie/activePage":
      return { ...state, activePage: action.payload };
    case "movie/activeBtn":
      return { ...state, activeBtn: action.payload };
    case "movie/loading":
      return { ...state, isLoading: true };
    case "movies/loaded":
      return { ...state, movies: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action type");
  }
}

function MovieDataProvider({ children }) {
  const [{ pageNum, activePage, activeBtn, movies, isLoading }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getMov() {
        try {
          dispatch({ type: "movie/loading" });

          const res = await fetch(
            `${BASE_URL}/movie/${activeBtn}?language=en-US&page=${pageNum}&api_key=${KEY}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching data");

          const data = await res.json();

          dispatch({ type: "movies/loaded", payload: data.results });
        } catch (err) {
          console.error(err.message);
        }
      }

      getMov();
    },
    [activeBtn, pageNum]
  );

  return (
    <MovieDataContext.Provider
      value={{ pageNum, activePage, movies, activeBtn, isLoading, dispatch }}
    >
      {children}
    </MovieDataContext.Provider>
  );
}

function useMovieData() {
  const context = useContext(MovieDataContext);
  if (context === undefined)
    throw new Error("MovieDataContext was used outside the MovieDataProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { MovieDataProvider, useMovieData };
