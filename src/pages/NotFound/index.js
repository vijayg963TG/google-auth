import { Link } from "react-router-dom";
import styles from "./styles.module.css"

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h1>Oops! You seem to be lost.</h1>
      <div>
      <p>Here are some helpful links:</p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
