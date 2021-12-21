import { Link } from "../../elements/Link/Link";
import styles from "./Footer.module.css";
import { HorizontalList } from "../../elements/HorizontalList/HorizontalList";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        All content copyright The Startup CTO © {new Date().getFullYear()} • All
        rights reserved.
      </div>
      <HorizontalList>
        <Link color="text" href="/imprint">
          Imprint
        </Link>
        <Link color="text" href="/privacy-policy">
          Privacy policy
        </Link>
      </HorizontalList>
    </footer>
  );
}
