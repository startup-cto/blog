import { Avatar } from "../../elements/Avatar/Avatar";
import { Heading } from "../../elements/Heading/Heading";
import { Box } from "../../elements/Box/Box";
import { Link } from "../../elements/Link/Link";

export function Header() {
  return (
    <Box textAlign="center" backgroundColor="background2">
      <Avatar />
      <Heading variant="h1">The Startup CTO</Heading>
      <Heading variant="h2">Building companies with web technology</Heading>
      <Heading variant="h3">
        <Link href="mailto:daniel@startup-cto.net">
          Hire me as a consultant
        </Link>
      </Heading>
    </Box>
  );
}
