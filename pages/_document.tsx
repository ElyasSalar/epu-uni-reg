import { Html, Head, Main, NextScript, DocumentProps } from "next/document"
import { MAP_LOCALE_TO_FONT } from "../shared/constants/font"
import { LOCALE_DIR } from "../shared/constants/locale"

import type { NextFont } from "@next/font/dist/types"
import type { Dir, Locale } from "../types/locales"

export default function Document(props: DocumentProps) {
  const locale = props.locale as Locale
  const font: NextFont = MAP_LOCALE_TO_FONT[locale]
  const dir: Dir = LOCALE_DIR[locale]

  return (
    <Html lang={locale} dir={dir}>
      <Head>
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href={`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/epu-logo.png`} />
      </Head>
      <body className={font.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
