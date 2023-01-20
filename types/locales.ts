import { LOCALES } from "../shared/constants/locale"

export type Locale = typeof LOCALES[keyof typeof LOCALES]

export interface UseLocale {
  locale: Locale
  direction: Dir
}

export type Dir = "rtl" | "ltr"