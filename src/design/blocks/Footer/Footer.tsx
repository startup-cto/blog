import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        All content copyright The Startup CTO © {new Date().getFullYear()} • All
        rights reserved.
      </div>
      <ul className={styles.nav}>
        <li className={styles.navLink}>
          <Link href="/imprint">Imprint</Link>
        </li>
        <li className={styles.navLink}>
          <Link href="/privacy-policy">Privacy policy</Link>
        </li>
      </ul>
    </footer>
  );
}
