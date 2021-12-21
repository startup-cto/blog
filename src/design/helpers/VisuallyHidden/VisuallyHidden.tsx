import { PropsWithChildren } from "react";
import styles from "./VisuallyHidden.module.css";

export function VisuallyHidden({ children }: PropsWithChildren<{}>) {
  return <span className={styles.visuallyHidden}>{children}</span>;
}
