import { ReactNode } from "react";
import styles from "./Heading.module.css";

interface Props {
  children?: ReactNode | undefined;
  variant: "h1" | "h2" | "h3" | "h4" | "h5";
}

export function Heading({ children, variant }: Props) {
  const Component = variant;
  const fontSizeClass = {
    h1: styles.fontSizeGiant,
    h2: styles.fontSizeBig,
    h3: styles.fontSizeLarge,
    h4: styles.fontSizeMedium,
    h5: styles.fontSizeSmall,
  };
  return (
    <Component className={`${styles.heading} ${fontSizeClass[variant]}`}>
      {children}
    </Component>
  );
}
