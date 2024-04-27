import styles from "./LoadingSpinner.module.scss";

function LoadingSpinner({ size = 50, color = "#333" }) {
  return (
    <div
      className={styles.loadingSpinnerContainer}
      style={{ width: size, height: size }}
    >
      <div
        className={styles.loadingSpinner}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
