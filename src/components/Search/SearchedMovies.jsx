import { useEffect, useState } from "react";
import { Calendar } from "@phosphor-icons/react";
import styles from "./Search.module.scss";
import { useWatchedMovies } from "../../contexts/WatchedMoviesProvider";

const KEY = "9b22856c339406c84c600cdd45f5d532";
const BASE_URL = "https://api.themoviedb.org/3";

function SearchedMovies({ movies }) {
  const { dispatch } = useWatchedMovies();

  const [genres, setGenres] = useState([]);
  const genreArr = movies.genre_ids;

  const { poster_path: poster, title, release_date: date } = movies;

  const movieDate = date ? new Date(date) : null;
  const options = {
    year: "numeric",
  };
  const formattedDate = movieDate
    ? new Intl.DateTimeFormat("en-US", options).format(movieDate)
    : "Unknown";

  useEffect(
    function () {
      async function getGenres() {
        //Getting Genre Data
        try {
          const genreRes = await fetch(
            `${BASE_URL}/genre/movie/list?api_key=${KEY}`
          );

          if (!genreRes.ok) throw new Error("Something went wrong");

          const genreData = await genreRes.json();

          const genresMap = new Map();

          genreData.genres.forEach((genre) =>
            genresMap.set(genre.id, genre.name)
          );

          const genreStrArr = genreArr.map((arr) => genresMap.get(arr));
          setGenres(genreStrArr);
        } catch (err) {
          console.error(err.message);
        }
      }

      getGenres();
    },
    [genreArr]
  );

  return (
    <li
      className={styles.listSearch}
      onClick={() =>
        dispatch({ type: "searchedMovie/selected", payload: movies.id })
      }
    >
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w780${poster}`}
          alt={title}
          className={styles.searchedImg}
        />
      </div>
      <div className={styles.movieDets}>
        <h2>{title}</h2>
        <ul className={styles.genreCont}>
          {genres.map((gen, i) => (
            <li key={i}>{gen} | </li>
          ))}
        </ul>

        <div className={styles.dateInfo}>
          <Calendar size={16} />
          <p className={styles.date}>{formattedDate}</p>
        </div>
      </div>
    </li>
  );
}

export default SearchedMovies;
