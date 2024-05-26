import { useMovieData } from "../../contexts/MovieDataProvider";
import LoadingSpinner from "../Loader/LoadingSpinner";
import RenderMoviesByCategory from "./RenderMoviesByCategory";
import styles from "./RenderMoviesByCategory.module.scss";

function CategoryMovies() {
  const { isLoading } = useMovieData();

  return (
    <div className={styles.mainCategory}>
      {isLoading ? (
        <LoadingSpinner size={400} color="#ff5733" />
      ) : (
        <RenderMoviesByCategory />
      )}
    </div>
  );
}

export default CategoryMovies;
