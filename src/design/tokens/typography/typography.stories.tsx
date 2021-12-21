import React from "react";
import styles from "./typography.module.css";

export default {
  title: "tokens/typography",
};

export const Paragraph = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

export const FontSizes = () => (
  <>
    <p style={{ fontSize: styles.giant }}>giant</p>
    <p style={{ fontSize: styles.big }}>big</p>
    <p style={{ fontSize: styles.large }}>large</p>
    <p style={{ fontSize: styles.medium }}>medium</p>
    <p style={{ fontSize: styles.small }}>small</p>
  </>
);
