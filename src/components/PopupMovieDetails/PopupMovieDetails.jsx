import { useEffect, useState } from "react";
import styles from "./PopupMovieDetails.module.scss";
import MovieCasts from "../MovieCasts/MovieCasts";
import StarRating from "../StarRating/StarRating";
import { HeartStraight } from "@phosphor-icons/react";
// import StarRating from "../StarRating/StarRating";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function PopupMovieDetails({
  movieId,
  onCloseSelectedMovie,
  onAddWatchedMovies,
  rating,
  setRating,
  watchedMoviesData,
}) {
  const [moviePopup, setMoviePopup] = useState({});

  const {
    genres,
    overview,
    poster_path: poster,
    release_date: date,
    runtime,
    tagline,
    title,
    vote_average: movieRating,
  } = moviePopup;

  const isWatchedMovie = watchedMoviesData
    .map((movie) => movie.id)
    .includes(movieId);

  // const userRating = watchedMoviesData.find((movie) => movie.id === movieId);
  // console.log(userRating);

  // const x = watchedMoviesData?.find((movie) => movie.id === moviePopup?.id);
  // const y = x.id === moviePopup?.id;
  // console.log(y);

  const hour = Math.floor(Number(runtime) / 60);
  const minutes = Number(runtime) % 60;

  useEffect(
    function () {
      async function getMovieById() {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&append_to_response=videos,images`
        );

        if (!res.ok) throw new Error("Something went wrong with your internet");

        const data = await res.json();

        setMoviePopup(data);
        console.log(data);
      }

      getMovieById();
    },
    [movieId]
  );

  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.key === "Escape") {
          onCloseSelectedMovie();
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [onCloseSelectedMovie]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `MovieMania | ${title}`;

      return () => {
        document.title = "MovieMania";
      };
    },
    [title]
  );

  return (
    <div className={styles.popupCont}>
      <div>
        <img
          className={styles.moviePopupImg}
          src={`https://image.tmdb.org/t/p/w780${poster}`}
          alt={title}
        />
      </div>
      <div className={styles.movieDets}>
        <button className={styles.closeMovieBtn} onClick={onCloseSelectedMovie}>
          x
        </button>
        <div>
          <p className={styles.movieTitle}>{title}</p>
          <p className={styles.movieTagline}>{tagline}</p>
          <h2>Description</h2>
          <p>{overview}</p>
        </div>
        <div>
          {!isWatchedMovie ? (
            <div>
              <StarRating rating={rating} setRating={setRating} />
              {rating > 0 && (
                <button onClick={() => onAddWatchedMovies(moviePopup)}>
                  <HeartStraight size={16} />
                  Add to favorites
                </button>
              )}
            </div>
          ) : (
            <p>You rated this movie</p>
          )}
        </div>
        <div>
          <p>
            0{hour}:{minutes}:00
          </p>
          {/* <p>{runtime}</p> */}
          <p>{date}</p>
          <ul className={styles.genres}>
            {genres?.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>{Number(movieRating).toFixed(1)}</p>
        </div>
        <MovieCasts movieId={movieId} />
      </div>
    </div>
  );
}

export default PopupMovieDetails;
