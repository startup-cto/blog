import { ComponentType, PropsWithChildren, ReactNode } from "react";
import styles from "./Container.module.css";

interface Props {
  children?: ReactNode | undefined;
  as?: string | ComponentType<PropsWithChildren<{ className: string }>>;
}

export function Container({ children, as: Component = "div" }: Props) {
  return <Component className={styles.container}>{children}</Component>;
}
