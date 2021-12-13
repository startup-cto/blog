import Image from "next/image";
import avatar from "./avatar.png";
import { staticImageLoader } from "../helpers/StaticImageLoader";
import styles from "./Header.module.css";

export function Header() {
  console.log(styles);
  return (
    <header className={styles.container}>
      <Image
        loader={staticImageLoader}
        src={avatar}
        alt="The Startup CTO"
        width={100}
        height={100}
        className={styles.avatar}
      />
      <h1 className={styles.header}>The Startup CTO</h1>
      <h2 className={styles.header}>Building companies with web technology</h2>
      <a href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
        Follow on Twitter
      </a>
    </header>
  );
}
