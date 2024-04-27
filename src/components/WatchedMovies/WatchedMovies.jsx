import Watched from "./Watched";

function WatchedMovies({ watchedMoviesData, onDeleteWatchedMovie, rating }) {
  return (
    <ul>
      {watchedMoviesData.map((movie) => (
        <Watched
          key={movie.id}
          movie={movie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
          rating={rating}
        />
      ))}
    </ul>
  );
}

export default WatchedMovies;
