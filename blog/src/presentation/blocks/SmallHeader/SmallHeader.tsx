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
        <Link href="/">Home</Link>
        <a href="mailto:daniel@startup-cto.net">Hire me as a consultant</a>
      </HorizontalList>
    </Box>
  );
}
