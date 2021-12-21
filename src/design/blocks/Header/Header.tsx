import { Avatar } from "../../elements/Avatar/Avatar";
import { Link } from "../../elements/Link/Link";
import { Heading } from "../../elements/Heading/Heading";
import { Box } from "../../elements/Box/Box";

export function Header() {
  return (
    <Box textAlign="center" backgroundColor="background2">
      <Avatar />
      <Heading variant="h1">The Startup CTO</Heading>
      <Heading variant="h2">Building companies with web technology</Heading>
      <Link
        fontSize="large"
        href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton"
      >
        Follow on Twitter
      </Link>
    </Box>
  );
}
