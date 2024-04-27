function Watched({ movie, onDeleteWatchedMovie, rating }) {
  // console.log(movie);

  const {
    poster_path: poster,
    title,
    runtime,
    vote_average: movieRating,
  } = movie;

  return (
    <li>
      <img src={`https://image.tmdb.org/t/p/w780${poster}`} alt={title} />
      <p>{title}</p>
      <p>{Number(movieRating).toFixed(1)}</p>
      <p>{rating}</p>
      <p>{runtime} min</p>
      <button onClick={() => onDeleteWatchedMovie(movie.id)}>X</button>
    </li>
  );
}

export default Watched;
