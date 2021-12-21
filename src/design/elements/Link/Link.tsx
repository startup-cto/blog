import { ReactNode } from "react";
import NextLink from "next/link";
import styles from "./Link.module.css";

interface Props {
  color?: "text" | "accent";
  fontSize?: "small" | "medium" | "large" | "big";
  href: string;
  children?: ReactNode | undefined;
}

export function Link({
  children,
  color = "accent",
  fontSize = "medium",
  href,
}: Props) {
  const colorClasses = {
    text: styles.colorText,
    accent: styles.colorAccent,
  };
  const fontSizeClasses = {
    small: styles.fontSizeSmall,
    medium: styles.fontSizeMedium,
    large: styles.fontSizeLarge,
    big: styles.fontSizeBig,
  };
  return (
    <NextLink href={href} passHref>
      <a
        className={`${styles.link} ${colorClasses[color]} ${fontSizeClasses[fontSize]}`}
      >
        {children}
      </a>
    </NextLink>
  );
}
