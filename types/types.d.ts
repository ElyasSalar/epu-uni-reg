import "i18next"
import { NextRouter } from "next/router"
import { Locale } from "./locales"

declare module "next/router" {
  declare function useRouter(): NextRouter & {
    locale: Locale
  }
}


declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false
  }
}