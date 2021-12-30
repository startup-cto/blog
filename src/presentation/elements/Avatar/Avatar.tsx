import Image from "next/image";
import avatar from "./avatar.webp";
import styles from "./Avatar.module.css";

export function Avatar() {
  return (
    <Image
      src={avatar}
      alt="The Startup CTO"
      width={100}
      height={100}
      unoptimized
      priority
      className={styles.avatar}
    />
  );
}
