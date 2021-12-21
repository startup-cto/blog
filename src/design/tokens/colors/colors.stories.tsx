import React from "react";
import colors from "./colors.module.css";
import chroma from "chroma-js";

export default {
  title: "tokens/colors",
};

function ColorBlock({ color: colorName }: { color: keyof typeof colors }) {
  const color = colors[colorName];
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "1rem",
        color: chroma(color).hsl()[2] > 0.5 ? "black" : "white",
      }}
    >
      {colorName}
    </div>
  );
}

export const Default = () => (
  <div>
    <ColorBlock color="text" />
    <ColorBlock color="accent" />
    <ColorBlock color="background1" />
    <ColorBlock color="background2" />
  </div>
);
