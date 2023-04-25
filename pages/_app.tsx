import "../styles/index.scss"
import { appWithTranslation } from "next-i18next"
import { MAP_LOCALE_TO_FONT } from "../shared/constants/font"

import type { AppProps } from "next/app"
import type { Locale } from "../types/locales"
import type { NextFont } from "@next/font/dist/types"
import { useEffect } from "react"
import { LOCALE_DIR } from "../shared/constants/locale"

function App({ Component, pageProps, router }: AppProps) {
  const locale = router.locale as Locale
  const font: NextFont = MAP_LOCALE_TO_FONT[locale]

  useEffect(() => {
    document.documentElement.dir = LOCALE_DIR[locale]
    document.body.classList.add(font.className)
  }, [locale, font.className])

  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

export default appWithTranslation(App)