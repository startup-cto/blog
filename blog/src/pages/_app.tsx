import "../../node_modules/normalize.css/normalize.css";
import styles from "../presentation/base.module.css";
import { AppProps } from "next/app";
import { useTrackPageView } from "../analytics/useTrackPageView";

export default function MyApp({ Component, pageProps }: AppProps) {
  useTrackPageView();

  return (
    <div className={styles.base}>
      <Component {...pageProps} />
    </div>
  );
}
