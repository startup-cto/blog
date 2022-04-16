import { PropsWithChildren } from "react";
import styles from "./InlineCode.module.css";

export function InlineCode({ children }: PropsWithChildren<{}>) {
  return <code className={styles.code}>{children}</code>;
}
