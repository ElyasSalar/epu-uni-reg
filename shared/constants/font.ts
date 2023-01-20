import type { NextFont } from "@next/font/dist/types"
import { Source_Sans_Pro, Vazirmatn } from "@next/font/google"
import { Locale } from "../../types/locales"
import { LOCALES } from "./locale"

export const sourceSansPro: NextFont = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "auto",
  preload: true,
})

export const vazirmatn: NextFont = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  display: "auto",
  preload: true,
})

export const MAP_LOCALE_TO_FONT: {[key in Locale]: NextFont} = {
  [LOCALES.EN]: sourceSansPro,
  [LOCALES.CKB]: vazirmatn,
}