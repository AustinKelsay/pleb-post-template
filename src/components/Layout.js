import Navbar from "./navbar/Navbar";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.main}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
