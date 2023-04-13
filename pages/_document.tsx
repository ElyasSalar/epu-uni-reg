import { Html, Head, Main, NextScript } from "next/document"
import { BASE_URL } from "../shared/constants/routes"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href={`${BASE_URL}/images/epu-logo.png`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
