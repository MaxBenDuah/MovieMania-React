import { useEffect } from "react";
import { HeartStraight } from "@phosphor-icons/react";
import { X } from "@phosphor-icons/react";

import styles from "./PopupMovieDetails.module.scss";
import StarRating from "../StarRating/StarRating";
import MovieCasts from "../MovieCasts/MovieCasts";
import { useWatchedMovies } from "../../contexts/WatchedMoviesProvider";

function PopupMovieDetails() {
  const { movieId, moviePopup, watchedMoviesData, rating, dispatch } =
    useWatchedMovies();

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

  //This is dsiabled for the meantime
  const isWatchedMovie = watchedMoviesData
    ?.map((movie) => movie.id)
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
      function handleKeyDown(e) {
        if (e.key === "Escape") {
          dispatch({ type: "selectedMovie/close" });
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [dispatch]
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
    movieId && (
      <div className={styles.popupCont}>
        <img
          className={styles.moviePopupImg}
          src={`https://image.tmdb.org/t/p/w780${poster}`}
          alt={title}
        />

        <div className={styles.movieDets}>
          <button
            className={styles.closeMovieBtn}
            onClick={() => dispatch({ type: "selectedMovie/close" })}
          >
            <X size={32} />
          </button>
          <div>
            <p className={styles.movieTitle}>{title}</p>
            <p className={styles.movieTagline}>{tagline}</p>
            <h2 className={styles.desc}>Description</h2>
            <p className={styles.overview}>{overview}</p>
          </div>
          <div className={styles.rating}>
            <div>
              {!isWatchedMovie ? (
                <div>
                  <StarRating color="#fa8f45" />
                  {rating > 0 && (
                    <div className={styles.btnCont}>
                      <button
                        className={styles.favoriteBtn}
                        onClick={() =>
                          dispatch({
                            type: "watchedMovies/add",
                            payload: moviePopup,
                          })
                        }
                      >
                        <HeartStraight size={20} />
                        <span>Add to favorites</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p>You rated this movie!</p>
              )}
            </div>
          </div>
          <div className={styles.movieSpecificsCont}>
            <div className={styles.duration}>
              <h2>Duration</h2>
              <p>
                0{hour}:{minutes}:00
              </p>
            </div>
            <div className={styles.releaseDate}>
              <h2>Date</h2>
              <p>{date}</p>
            </div>
            <div className={styles.genreCont}>
              <h2>Genre</h2>
              <ul className={styles.genres}>
                {genres?.map((genre) => (
                  <li key={genre.id}>{genre.name}|</li>
                ))}
              </ul>
            </div>
            <div className={styles.ratingNum}>
              <h2>Rating</h2>
              <p>{Number(movieRating).toFixed(1)}</p>
            </div>
          </div>
          <MovieCasts />
        </div>
      </div>
    )
  );
}

export default PopupMovieDetails;
