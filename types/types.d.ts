import { NextRouter } from "next/router"
import { Locale } from "./locales"

declare module "next/router" {
  declare function useRouter(): NextRouter & {
    locale: Locale
  }
}
