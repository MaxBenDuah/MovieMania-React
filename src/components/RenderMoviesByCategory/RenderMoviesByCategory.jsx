import MovieCategory from "./MovieCategory";
import styles from "./RenderMoviesByCategory.module.scss";

function RenderMoviesByCategory({ movies }) {
  return (
    <ul className={styles.renderMoviesCategoryCont}>
      {movies?.map((movie) => {
        return <MovieCategory key={movie.id} movie={movie} />;
      })}
    </ul>
  );
}

export default RenderMoviesByCategory;
