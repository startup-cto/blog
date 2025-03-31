import * as nextImage from "next/image";
import "normalize.css";
import styles from "../src/presentation/base.module.css";
import React from "react";

// Mock Next.js Image component
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: "dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={styles.base}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
