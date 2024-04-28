import { useEffect, useState } from "react";
import { Calendar } from "@phosphor-icons/react";
import styles from "./Search.module.scss";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function SearchedMovies({ movies, onAddMovieId }) {
  const [genres, setGenres] = useState([]);
  // const description = movies.overview.split(" ");
  const genreArr = movies.genre_ids;

  const { poster_path: poster, title, release_date: date } = movies;

  const movieDate = date ? new Date(date) : null;
  const options = {
    year: "numeric",
  };
  const formattedDate = movieDate
    ? new Intl.DateTimeFormat("en-US", options).format(movieDate)
    : "Unknown";
  // console.log(formattedDate);
  console.log(movies);

  useEffect(
    function () {
      async function getGenres() {
        //Getting Genre Data

        try {
          const genreRes = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`
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
    <li className={styles.listSearch} onClick={() => onAddMovieId(movies.id)}>
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

{
  /* <p className={styles.desc}>
          {description.length > 20 && description.join(" ").slice(0, 200)}...
        </p> */
}

{
  /* <p>⭐️ {Number(movies.vote_average).toFixed(1)}</p> */
}
