import { Avatar } from "../../elements/Avatar/Avatar";
import { Heading } from "../../elements/Heading/Heading";
import { Box } from "../../elements/Box/Box";

export function Header() {
  return (
    <Box textAlign="center" backgroundColor="background2">
      <Avatar />
      <Heading variant="h1">The Startup CTO</Heading>
      <Heading variant="h2">Building companies with web technology</Heading>
      <Heading variant="h2">
        <a href="mailto:daniel@startup-cto.net">Hire me as a consultant</a>
      </Heading>
    </Box>
  );
}
