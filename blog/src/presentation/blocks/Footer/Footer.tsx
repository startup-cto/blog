import { Link } from "../../elements/Link/Link";
import { HorizontalList } from "../../elements/HorizontalList/HorizontalList";
import { Box } from "../../elements/Box/Box";

export function Footer() {
  return (
    <Box as="footer" backgroundColor="background2" textAlign="center">
      <div>
        All content copyright The Startup CTO © {new Date().getFullYear()} • All
        rights reserved.
      </div>
      <HorizontalList>
        <Link color="text" href="/blog/src/pages/imprint">
          Imprint
        </Link>
        <Link color="text" href="/blog/src/pages/privacy-policy">
          Privacy policy
        </Link>
      </HorizontalList>
    </Box>
  );
}
