import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div>
        All content copyright The Startup CTO © {new Date().getFullYear()} • All
        rights reserved.
      </div>
      <ul>
        <li>
          <Link href="/imprint">Imprint</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Privacy policy</Link>
        </li>
      </ul>
    </footer>
  );
}
