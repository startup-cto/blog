import { ReactElement } from "react";
import styles from "./VisuallyHidden.module.css";

interface Props {
  children?: ReactElement | undefined;
}

export function VisuallyHidden({ children }: Props) {
  return <span className={styles.visuallyHidden}>{children}</span>;
}
