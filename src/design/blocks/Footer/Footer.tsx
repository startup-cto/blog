import { Link } from "../../elements/Link/Link";
import { HorizontalList } from "../../elements/HorizontalList/HorizontalList";
import { Block } from "../../elements/Block/Block";

export function Footer() {
  return (
    <Block as="footer" backgroundColor="background2" textAlign="center">
      <div>
        All content copyright The Startup CTO © {new Date().getFullYear()} • All
        rights reserved.
      </div>
      <HorizontalList>
        <Link color="text" href="/imprint">
          Imprint
        </Link>
        <Link color="text" href="/privacy-policy">
          Privacy policy
        </Link>
      </HorizontalList>
    </Block>
  );
}
