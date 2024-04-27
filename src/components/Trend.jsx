import styles from "./TrendingMovies.module.scss";

function Trend({ trend }) {
  return (
    <li>
      <img
        className={styles.trendingImg}
        src={`https://image.tmdb.org/t/p/w780${trend.poster_path}`}
      />
    </li>
  );
}

export default Trend;
