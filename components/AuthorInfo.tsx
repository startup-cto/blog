import Link from "next/link";

export function AuthorInfo() {
  return (
    <aside>
      <h1>Daniel Bartholomae</h1>
      <p>
        Daniel Bartholomae is a Berlin based founder and web developer. You can{" "}
        <Link href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
          follow him on Twitter
        </Link>
        .
      </p>
    </aside>
  );
}
