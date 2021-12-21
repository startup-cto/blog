import styles from "./SmallHeader.module.css";
import Link from "next/link";
import { Avatar } from "../../elements/Avatar/Avatar";

export function SmallHeader() {
  return (
    <header className={styles.container}>
      <Avatar />
      <br />
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <a
        className={styles.link}
        href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton"
      >
        Follow on Twitter
      </a>
    </header>
  );
}
