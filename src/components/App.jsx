import { useEffect, useState } from "react";
// import Footer from "./Footer";
import Search from "./Search/Search";
// import TrendingMovies from "./TrendingMovies";
import Pagination from "./Pagination";
import MovieListButtons from "./RenderMoviesByCategory/MovieListButtons";
import Logo from "./Logo";
import Header from "./Header/Header";
import RenderMoviesByCategory from "./RenderMoviesByCategory/RenderMoviesByCategory";
import LoadingSpinner from "./Loader/LoadingSpinner";
import RenderSearchedMovies from "./Search/RenderSearchedMovies";
import PopupMovieDetails from "./PopupMovieDetails/PopupMovieDetails";
import WatchedMovies from "./WatchedMovies/WatchedMovies";

// const KEY = "9b22856c339406c84c600cdd45f5d532";

// const AppContext = React.createContext();

function App() {
  const [query, setQuery] = useState("");
  const [pagNum, setPageNum] = useState(1);
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [watchedMoviesData, setWatchedMoviesData] = useState(function () {
    const storedValue = localStorage.getItem("watchedMovies");
    return JSON.parse(storedValue);
  });
  const [rating, setRating] = useState(0);
  const [searchedMovies, setSearchedMovies] = useState([]);
  // console.log(pagNum);

  // console.log(movieId);

  function handleAddMovieId(id) {
    setMovieId(id);
  }

  function handleCloseMovie() {
    setMovieId(null);
  }

  function handleAddWatchedMovies(movie) {
    setWatchedMoviesData((prevWatchedMovie) => [...prevWatchedMovie, movie]);
  }

  function handleDeleteWatchedMovies(id) {
    setWatchedMoviesData((prevWatchedMovie) =>
      prevWatchedMovie.filter((movie) => movie.id !== id)
    );
  }

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMoviesData));
    },
    [watchedMoviesData]
  );

  return (
    <div>
      <Header>
        <Logo />
        <MovieListButtons
          pagNum={pagNum}
          movies={movies}
          setMovies={setMovies}
          setIsLoading={setIsLoading}
        />
        <Search
          query={query}
          setQuery={setQuery}
          setSearchedMovies={setSearchedMovies}
        />
      </Header>

      <div>
        {isLoading ? (
          <LoadingSpinner size={400} color="#ff5733" />
        ) : (
          <RenderMoviesByCategory movies={movies} />
        )}
      </div>
      <RenderSearchedMovies
        query={query}
        setIsLoading={setIsLoading}
        onAddMovieId={handleAddMovieId}
        searchedMovies={searchedMovies}
        setSearchedMovies={setSearchedMovies}
      />
      {movieId && (
        <PopupMovieDetails
          movieId={movieId}
          onCloseSelectedMovie={handleCloseMovie}
          onAddWatchedMovies={handleAddWatchedMovies}
          rating={rating}
          setRating={setRating}
          watchedMoviesData={watchedMoviesData}
        />
      )}
      <WatchedMovies
        watchedMoviesData={watchedMoviesData}
        onDeleteWatchedMovie={handleDeleteWatchedMovies}
        rating={rating}
      />
      <Pagination setPageNum={setPageNum} />
    </div>
  );
}

export default App;

{
  /* <RenderMoviesByCategory movies={movies} /> */
}
{
  /* <TrendingMovies /> */
}
{
  /* <Footer /> */
}
