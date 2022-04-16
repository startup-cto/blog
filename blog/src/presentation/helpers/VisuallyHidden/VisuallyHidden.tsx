import { ReactNode } from "react";
import styles from "./VisuallyHidden.module.css";

interface Props {
  children?: ReactNode;
}

export function VisuallyHidden({ children }: Props) {
  return <span className={styles.visuallyHidden}>{children}</span>;
}
