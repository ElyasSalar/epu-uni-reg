import { ROUTES } from "../routes"

type NavbarItems = {
  id: string,
  href: string,
  translationKey: string,
}

export const NAVBAR_ITEMS: Array<NavbarItems> = [
  {
    id: ROUTES.home.name,
    href: ROUTES.home.path,
    translationKey: "nav_home",
  },
  {
    id: ROUTES.onlineRegistration.name,
    href: ROUTES.onlineRegistration.path,
    translationKey: "nav_onlineregistration",
  },
  {
    id: ROUTES.instructions.name,
    href: ROUTES.instructions.path,
    translationKey: "nav_instructions",
  },
  {
    id: ROUTES.locations.name,
    href: ROUTES.locations.path,
    translationKey: "nav_locations",
  },
  {
    id: ROUTES.qa.name,
    href: ROUTES.qa.path,
    translationKey: "nav_qa",
  },
]