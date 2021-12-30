import { Children, ReactNode } from "react";
import styles from "./HorizontalList.module.css";

export function HorizontalList({
  children,
}: {
  children?: ReactNode | undefined;
}) {
  return (
    <ul className={styles.list}>
      {Children.map(children, (child) => (
        <li className={styles.listItem}>{child}</li>
      ))}
    </ul>
  );
}
