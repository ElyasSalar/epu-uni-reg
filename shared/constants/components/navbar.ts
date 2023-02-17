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
<<<<<<< Updated upstream
=======
  },
  {
    id: ROUTES.onlineRegistration.name,
    href: ROUTES.onlineRegistration.path,
    translationKey: "nav_onlineregistration",
>>>>>>> Stashed changes
  },
  {
    id: ROUTES.instructions.name,
    href: ROUTES.instructions.path,
    translationKey: "nav_instructions",
  },
  {
<<<<<<< Updated upstream
    id: ROUTES.onlineRegistration.name,
    href: ROUTES.onlineRegistration.path,
    translationKey: "nav_onlineregistration",
=======
    id: ROUTES.qa.name,
    href: ROUTES.qa.path,
    translationKey: "nav_qa",
>>>>>>> Stashed changes
  },
  {
    id: ROUTES.contactus.name,
    href: ROUTES.contactus.path,
    translationKey: "nav_contactus",
<<<<<<< Updated upstream
  },
  {
    id: ROUTES.qa.name,
    href: ROUTES.qa.path,
    translationKey: "nav_qa",
=======
>>>>>>> Stashed changes
  },
]