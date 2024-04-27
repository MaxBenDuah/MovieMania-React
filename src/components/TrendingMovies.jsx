import { useState } from "react";
import styles from "./TrendingMovies.module.scss";
import Trend from "./Trend";

function TrendingMovies() {
  const [trending, setTrending] = useState([]);

  async function handleTrend() {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjIyODU2YzMzOTQwNmM4NGM2MDBjZGQ0NWY1ZDUzMiIsInN1YiI6IjY2MWQwMjhlZTQ4ODYwMDE4NTNiNTA4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vi1m7d9zUG-3jNiElc3af1XIgz0F3X3SVItN8-stoy8",
        },
      };

      const res = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      );

      if (!res.ok) throw new Error("Something went wrong with your internet");

      const data = await res.json();
      setTrending(data.results);
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
    // useEffect(function () {
    //   async function getTrending() {
    //     try {
    //       const options = {
    //         method: "GET",
    //         headers: {
    //           accept: "application/json",
    //           Authorization:
    //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjIyODU2YzMzOTQwNmM4NGM2MDBjZGQ0NWY1ZDUzMiIsInN1YiI6IjY2MWQwMjhlZTQ4ODYwMDE4NTNiNTA4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vi1m7d9zUG-3jNiElc3af1XIgz0F3X3SVItN8-stoy8",
    //         },
    //       };
    //       const res = await fetch(
    //         "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    //         options
    //       );
    //       if (!res.ok)
    //         throw new Error("Something went wrong with your internet");
    //       const data = await res.json();
    //       setTrending(data.results);
    //       console.log(data);
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   }
    //   getTrending();
    // }, []);
  }

  return (
    <div>
      <button onClick={handleTrend}>Trending</button>

      <ul className={styles.trendingMovies}>
        {trending.map((trend) => (
          <Trend key={trend.id} trend={trend} />
        ))}
      </ul>
    </div>
  );
}

export default TrendingMovies;
