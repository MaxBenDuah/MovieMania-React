import styles from "./Header.module.scss";

function Header({ children }) {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerSubCont}>{children}</div>
    </header>
  );
}

export default Header;
