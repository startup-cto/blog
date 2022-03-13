import "normalize.css";
import styles from "../src/presentation/base.module.css";
import { AppProps } from "next/app";
import { useTrackPageView } from "../src/analytics/useTrackPageView";

export default function MyApp({ Component, pageProps }: AppProps) {
  useTrackPageView();

  return (
    <div className={styles.base}>
      <Component {...pageProps} />
    </div>
  );
}
