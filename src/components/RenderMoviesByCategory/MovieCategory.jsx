import { useEffect, useState } from "react";
import styles from "./RenderMoviesByCategory.module.scss";
import { Calendar } from "@phosphor-icons/react";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function MovieCategory({ movie }) {
  const [genres, setGenres] = useState([]);

  const {
    poster_path: poster,
    title,
    vote_average: rating,
    release_date: date,
    overview,
    genre_ids: genreArr,
  } = movie;

  const desc = overview.split(" ").slice(0, 50).join(" ");

  useEffect(
    function () {
      async function getGenres() {
        const genreRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`
        );

        if (!genreRes.ok) throw new Error("Error while fetching genre data");

        const genreData = await genreRes.json();

        const genreMap = new Map();

        genreData.genres.forEach((genre) => genreMap.set(genre.id, genre.name));

        const genreStrArr = genreArr.map((genreNum) => genreMap.get(genreNum));
        setGenres(genreStrArr);
      }

      getGenres();
    },
    [genreArr]
  );

  return (
    <li key={movie.id} className={styles.card}>
      <div className={`${styles.cardSide} ${styles.cardSideFront}`}>
        <img
          className={styles.listMoviesCategoryImg}
          src={`https://image.tmdb.org/t/p/w780${poster}`}
          alt={title}
        />
      </div>
      <div className={`${styles.cardSide} ${styles.cardSideBack}`}>
        <div className={styles.movieDets}>
          <p className={styles.title}>{title}</p>
          <ul className={styles.genres}>
            {genres.map((gen, i) => (
              <li key={i}>{gen} | </li>
            ))}
          </ul>
          <div className={styles.date}>
            <Calendar size={16} />
            <p>{date}</p>
          </div>
          <p className={styles.rating}>⭐️ {Number(rating).toFixed(1)}</p>
          <p className={styles.description}>{desc}</p>
        </div>
      </div>
    </li>
  );
}

export default MovieCategory;
