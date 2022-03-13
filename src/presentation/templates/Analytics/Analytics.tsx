import { Head } from "../../helpers/Head/Head";
import { Header } from "../../blocks/Header/Header";
import { Footer } from "../../blocks/Footer/Footer";
import { PageAnalytics } from "../../blocks/PageAnalytics/PageAnalytics";

export function Analytics() {
  return (
    <>
      <Head
        description="Building companies with web technology"
        slug=""
        title="The Startup CTO"
        type="website"
      />

      <Header />
      <main>
        <PageAnalytics />
      </main>
      <Footer />
    </>
  );
}
