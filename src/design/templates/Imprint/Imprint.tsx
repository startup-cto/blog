import { Footer } from "../../blocks/Footer/Footer";
import { SmallHeader } from "../../blocks/SmallHeader/SmallHeader";
import styles from "./Imprint.module.css";

export function Imprint() {
  return (
    <>
      <SmallHeader />
      <main className={styles.container}>
        <h1 className={styles.header}>Imprint</h1>
        <h2 className={styles.header}>
          Information in accordance with Section 5 TMG
        </h2>
        <p>
          Wilhelmine-Gemberg-Weg 11 10179 Berlin Contact Information Telephone:
          +49 30 20847337 E-Mail: daniel@startup-cto.net
        </p>
        <h2 id="disclaimer" className={styles.header}>
          Disclaimer
        </h2>
        <h3 id="accountabilityforcontent" className={styles.header}>
          Accountability for content
        </h3>
        <p>
          The contents of our pages have been created with the utmost care.
          However, we cannot guarantee the contents&apos; accuracy, completeness
          or topicality. According to statutory provisions, we are furthermore
          responsible for our own content on these web pages. In this matter,
          please note that we are not obliged to monitor the transmitted or
          saved information of third parties, or investigate circumstances
          pointing to illegal activity.
          <br />
          Our obligations to remove or block the use of information under
          generally applicable laws remain unaffected by this as per §§ 8 to 10
          of the Telemedia Act (TMG).
        </p>
        <h3 id="accountabilityforlinks" className={styles.header}>
          Accountability for links
        </h3>
        <p>
          Responsibility for the content of external links (to web pages of
          third parties) lies solely with the operators of the linked pages. No
          violations were evident to us at the time of linking. Should any legal
          infringement become known to us, we will remove the respective link
          immediately.
        </p>
        <h3 id="copyright" className={styles.header}>
          Copyright
        </h3>
        <p>
          Our web pages and their contents are subject to German copyright law.
          Unless expressly permitted by law, every form of utilizing,
          reproducing or processing works subject to copyright protection on our
          web pages requires the prior consent of the respective owner of the
          rights.
          <br />
          Individual reproductions of a work are only allowed for private use.
          The materials from these pages are copyrighted and any unauthorized
          use may violate copyright laws.
        </p>
        <p className={styles.header}>
          <em>Source:</em>{" "}
          <a href="http://www.translate-24h.de" className={styles.link}>
            Englisch-Übersetzungsdienst translate-24h
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
