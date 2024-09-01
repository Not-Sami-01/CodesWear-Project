import Navbar from "@/components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <title>CodesWear - Wear the code</title>
        <link rel="shortcut icon" href="/codeswearcircle2.png" type="image/x-icon" />
      </Head>
      <body className="overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
