import { useState } from "react";

import Search from "./Search/Search";
import Pagination from "./Pagination/Pagination";
import MovieListButtons from "./RenderMoviesByCategory/MovieListButtons";
import Logo from "./Logo";
import Header from "./Header/Header";
import RenderSearchedMovies from "./Search/RenderSearchedMovies";
import PopupMovieDetails from "./PopupMovieDetails/PopupMovieDetails";
import WatchedMovies from "./WatchedMovies/WatchedMovies";
import CategoryMovies from "./RenderMoviesByCategory/CategoryMovies";
import { useLocalStorageState } from "./useLocalStorageState";

function App() {
  const [query, setQuery] = useState("");
  const [pagNum, setPageNum] = useState(1);
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [watchedMoviesData, setWatchedMoviesData] = useLocalStorageState(
    [],
    "watchedMovies"
  );
  const [rating, setRating] = useState(0);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);

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
        <Search query={query} setQuery={setQuery} />
      </Header>

      <Pagination
        setPageNum={setPageNum}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <CategoryMovies movies={movies} isLoading={isLoading} />
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
      <Pagination
        setPageNum={setPageNum}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <WatchedMovies
        watchedMoviesData={watchedMoviesData}
        onDeleteWatchedMovie={handleDeleteWatchedMovies}
        rating={rating}
      />
    </div>
  );
}

export default App;
