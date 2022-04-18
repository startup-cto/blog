import { Avatar } from "../../elements/Avatar/Avatar";
import { Link } from "../../elements/Link/Link";
import { HorizontalList } from "../../elements/HorizontalList/HorizontalList";
import { Box } from "../../elements/Box/Box";

export function SmallHeader() {
  return (
    <Box textAlign="center" backgroundColor="background2">
      <Avatar />
      <br />
      <HorizontalList>
        <Link href="/blog/src/pages">Home</Link>
        <Link href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
          Follow on Twitter
        </Link>
      </HorizontalList>
    </Box>
  );
}
