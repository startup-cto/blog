import { Link } from "../../elements/Link/Link";
import { Heading } from "../../elements/Heading/Heading";
import { Box } from "../../elements/Box/Box";
import { Container } from "../../elements/Container/Container";

export function AuthorInfo() {
  return (
    <Box as="aside" backgroundColor="background2" textAlign="center">
      <Container>
        <Heading variant="h1">Daniel Bartholomae</Heading>
        <p>
          Daniel Bartholomae is a Berlin based founder and web developer. You
          can subscribe to his articles{" "}
          <Link href="https://buttondown.email/startup-cto">via email</Link>,{" "}
          <Link href="https://startup-cto.net/rss.xml">via RSS</Link>, or{" "}
          <Link href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
            follow him on Twitter
          </Link>
          .
        </p>
      </Container>
    </Box>
  );
}
