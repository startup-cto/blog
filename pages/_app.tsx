import "normalize.css";
import styles from "../src/presentation/base.module.css";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.base}>
      <Component {...pageProps} />
    </div>
  );
}
