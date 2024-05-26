import Search from "./Search/Search";
import Pagination from "./Pagination/Pagination";
import MovieListButtons from "./RenderMoviesByCategory/MovieListButtons";
import Logo from "./Logo";
import Header from "./Header/Header";
import RenderSearchedMovies from "./Search/RenderSearchedMovies";
import PopupMovieDetails from "./PopupMovieDetails/PopupMovieDetails";
import WatchedMovies from "./WatchedMovies/WatchedMovies";
import CategoryMovies from "./RenderMoviesByCategory/CategoryMovies";
import { SearchProvider } from "../contexts/SearchProvider";
import { MovieDataProvider } from "../contexts/MovieDataProvider";
import { WatchedMoviesProvider } from "../contexts/WatchedMoviesProvider";

function App() {
  return (
    <SearchProvider>
      <MovieDataProvider>
        <WatchedMoviesProvider>
          <Header>
            <Logo />
            <MovieListButtons />
            <Search />
          </Header>
          <Pagination />
          <CategoryMovies />
          <RenderSearchedMovies />
          <PopupMovieDetails />
          <Pagination />
          <WatchedMovies />
        </WatchedMoviesProvider>
      </MovieDataProvider>
    </SearchProvider>
  );
}

export default App;
