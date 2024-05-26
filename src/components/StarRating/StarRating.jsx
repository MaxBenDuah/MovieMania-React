import { useState } from "react";
import Star from "./Star";
import { useWatchedMovies } from "../../contexts/WatchedMoviesProvider";

const mainContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const starContainer = {
  display: "flex",
  cursor: "pointer",
};

const textStyle = {
  fontSize: "24px",
  lineHeight: "1",
  margin: "0",
  color: "#fa8f45",
};

const StarRating = function ({
  maxRating = 10,
  color = "#fcc419",
  size = 24,
  message = [],
  className = "",
}) {
  const [tempRating, setTempRating] = useState(0);
  const { rating, dispatch } = useWatchedMovies();

  const handleRating = (ratingNum) => {
    dispatch({ type: "rating/getNum", payload: ratingNum });
  };

  const handleTempRating = (ratingNum) => {
    setTempRating(ratingNum);
  };

  return (
    <div className={className} style={mainContainerStyle}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => handleTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating
          ? tempRating
          : rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
