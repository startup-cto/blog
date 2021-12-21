import styles from "./Header.module.css";
import { Avatar } from "../../elements/Avatar/Avatar";
import { Link } from "../../elements/Link/Link";

export function Header() {
  return (
    <header className={styles.container}>
      <Avatar />
      <h1 className={styles.header}>The Startup CTO</h1>
      <h2 className={styles.header}>Building companies with web technology</h2>
      <Link
        fontSize="large"
        href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton"
      >
        Follow on Twitter
      </Link>
    </header>
  );
}
