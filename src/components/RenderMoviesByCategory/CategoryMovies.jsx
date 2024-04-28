import LoadingSpinner from "../Loader/LoadingSpinner";
import RenderMoviesByCategory from "./RenderMoviesByCategory";
import styles from "./RenderMoviesByCategory.module.scss";

function CategoryMovies({ movies, isLoading }) {
  return (
    <div className={styles.mainCategory}>
      {isLoading ? (
        <LoadingSpinner size={400} color="#ff5733" />
      ) : (
        <RenderMoviesByCategory movies={movies} />
      )}
    </div>
  );
}

export default CategoryMovies;
