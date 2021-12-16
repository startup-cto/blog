import styles from "./AuthorInfo.module.css";

export function AuthorInfo() {
  return (
    <aside className={styles.container}>
      <h1 className={styles.title}>Daniel Bartholomae</h1>
      <p>
        Daniel Bartholomae is a Berlin based founder and web developer. You can{" "}
        <a
          className={styles.link}
          href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton"
        >
          follow him on Twitter
        </a>
        .
      </p>
    </aside>
  );
}
