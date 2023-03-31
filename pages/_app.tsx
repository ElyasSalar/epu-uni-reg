import "../styles/index.scss"
import { appWithTranslation } from "next-i18next"
import { LOCALE_DIR } from "../shared/constants/locale"
import { MAP_LOCALE_TO_FONT } from "../shared/constants/font"

import type { AppProps } from "next/app"
import type { Dir, Locale } from "../types/locales"
import type { NextFont } from "@next/font/dist/types"

function App({ Component, pageProps, router }: AppProps) {
  const locale: Locale = router.locale as Locale
  const font: NextFont = MAP_LOCALE_TO_FONT[locale]
  const dir: Dir = LOCALE_DIR[locale]

  return (
    <div className={font.className} dir={dir}>
      <Component {...pageProps} />
    </div>
  )
}

export default appWithTranslation(App)