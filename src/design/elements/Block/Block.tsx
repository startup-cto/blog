import styles from "./Block.module.css";
import { ComponentType, HTMLProps, ReactNode } from "react";

interface Props extends Omit<HTMLProps<unknown>, "as"> {
  children?: ReactNode | undefined;
  color?: "accent";
  backgroundColor?: "background1" | "background2";
  textAlign?: "center";
  as?: string | ComponentType<{ className: string }>;
}

export function Block({
  children,
  color,
  as: Component = "div",
  textAlign,
  backgroundColor,
  ...props
}: Props) {
  const backgroundClasses = {
    background1: styles.backgroundColor1,
    background2: styles.backgroundColor2,
  };
  return (
    <Component
      className={`${styles.padding} ${textAlign && styles.center} ${
        backgroundColor && backgroundClasses[backgroundColor]
      } ${color && styles.colorAccent}`}
      {...props}
    >
      {children}
    </Component>
  );
}
