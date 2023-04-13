import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href={`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/epu-logo.png`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
