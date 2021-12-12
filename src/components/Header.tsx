import Image from "next/image";
import avatar from "./avatar.png";
import { staticImageLoader } from "../helpers/StaticImageLoader";

export function Header() {
  return (
    <header
      style={{
        backgroundColor: "#27232f",
        color: "#dddbe6",
        fontFamily: '"Courier New", Courier, monospace',
        paddingTop: "100px",
        textAlign: "center",
      }}
    >
      <Image
        loader={staticImageLoader}
        src={avatar}
        alt="The Startup CTO"
        width={100}
        height={100}
        style={{ borderRadius: "50%", margin: "0 auto" }}
      />
      <h1 style={{ fontWeight: "normal" }}>The Startup CTO</h1>
      <h2 style={{ fontWeight: "normal" }}>
        Building companies with web technology
      </h2>
      <a href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
        Follow on Twitter
      </a>
    </header>
  );
}
