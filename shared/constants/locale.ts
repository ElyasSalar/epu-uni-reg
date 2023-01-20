import type { Locale, Dir } from "../../types/locales"

export const LOCALES = {
  CKB: "ckb",
  EN: "en",
} as const

export const DEFAULT_LOCALE: Locale = LOCALES.CKB

export const LOCALE_DIR: {[key in Locale]: Dir} = {
  [LOCALES.CKB]: "rtl",
  [LOCALES.EN]: "ltr",
} as const