import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorageState } from "../components/useLocalStorageState";

const KEY = "9b22856c339406c84c600cdd45f5d532";
const BASE_URL = "https://api.themoviedb.org/3";

const WatchedMoviesContext = createContext();

const initialState = {
  watchedMoviesData: [],
  moviePopup: {},
  movieId: null,
  rating: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "watchedMovies/delete":
      return {
        ...state,
        watchedMoviesData: state.watchedMoviesData.filter(
          (movies) => movies.id !== action.payload
        ),
      };
    case "searchedMovies/select":
      return {
        ...state,
        moviePopup: action.payload,
      };
    case "watchedMovies/add":
      return {
        ...state,
        watchedMoviesData: [...state.watchedMoviesData, action.payload],
      };
    case "selectedMovie/close":
      return { ...state, movieId: null };
    case "searchedMovie/selected":
      return { ...state, movieId: action.payload };
    case "rating/getNum":
      return { ...state, rating: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function WatchedMoviesProvider({ children }) {
  const [watchedMoviesData, setWatchedMoviesData] = useLocalStorageState(
    [],
    "watchedMovies"
  );

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    watchedMoviesData,
  });

  useEffect(() => {
    setWatchedMoviesData(state.watchedMoviesData);
  }, [state.watchedMoviesData, setWatchedMoviesData]);

  const value = {
    watchedMoviesData: state.watchedMoviesData,
    moviePopup: state.moviePopup,
    movieId: state.movieId,
    rating: state.rating,
    dispatch,
  };

  useEffect(
    function () {
      async function getMovieById() {
        try {
          const res = await fetch(
            `${BASE_URL}/movie/${value.movieId}?api_key=${KEY}&append_to_response=videos,images`
          );

          if (!res.ok)
            throw new Error("Something went wrong with your internet");

          const data = await res.json();

          dispatch({ type: "searchedMovies/select", payload: data });
        } catch (err) {
          console.log(err.message);
        }
      }

      getMovieById();
    },
    [value.movieId]
  );

  return (
    <WatchedMoviesContext.Provider value={value}>
      {children}
    </WatchedMoviesContext.Provider>
  );
}

function useWatchedMovies() {
  const context = useContext(WatchedMoviesContext);
  if (context === undefined)
    throw new Error(
      "WatchedMoviesContext was used outside of the WatchedMoviesProvider"
    );
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WatchedMoviesProvider, useWatchedMovies };
