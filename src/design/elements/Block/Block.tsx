import styles from "./Block.module.css";
import { ComponentType, ReactNode } from "react";

interface Props {
  children?: ReactNode | undefined;
  backgroundColor?: "background1" | "background2";
  textAlign?: "center";
  as?: string | ComponentType<{ className: string }>;
}

export function Block({
  children,
  as: Component = "div",
  textAlign,
  backgroundColor,
}: Props) {
  const backgroundClasses = {
    background1: styles.backgroundColor1,
    background2: styles.backgroundColor2,
  };
  return (
    <Component
      className={`${styles.padding} ${textAlign && styles.center} ${
        backgroundColor && backgroundClasses[backgroundColor]
      }`}
    >
      {children}
    </Component>
  );
}
