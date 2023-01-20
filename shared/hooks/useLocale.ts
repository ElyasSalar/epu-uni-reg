import { i18n } from "next-i18next"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import type { Locale, UseLocale, Dir } from "../../types/locales"

export const useLocale = (): UseLocale => {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>(i18n?.language as Locale)
  const [direction, setDirection] = useState<Dir>(i18n?.dir(locale) as Dir)

  useEffect(() => {
    i18n?.on("languageChanged", (language: Locale) => {
      console.log("languageChanged", language)
      router.replace(router.asPath, router.asPath, { locale: language })
      setDirection(i18n?.dir(language) as Dir)
      setLocale(language)
    })
  }, [router])

  return { locale, direction }
}