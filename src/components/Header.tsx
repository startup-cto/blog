import Image from "next/image";
import avatar from "./avatar.png";

export function Header() {
  return (
    <header>
      <Image src={avatar} alt="The Startup CTO" width={100} height={100} />
      <h1>The Startup CTO</h1>
      <h2>Building companies with web technology</h2>
      <a href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
        Follow on Twitter
      </a>
    </header>
  );
}
