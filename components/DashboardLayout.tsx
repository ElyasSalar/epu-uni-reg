import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { ROUTES } from "../shared/constants/routes"
import { LOCALES } from "../shared/constants/locale"

import HomeIcon from "../assets/icons/home.svg"
import PersonIcon from "../assets/icons/person.svg"
import LanguagesIcon from "../assets/icons/languages.svg"

import type { Locale } from "../types/locales"
import type { ReactNode } from "react"

const DashboardLayout = ({ children }: {
  children: ReactNode
}) => {
  const { t } = useTranslation("common")
  const { asPath, locale } = useRouter()

  const changeLocaleTo: Locale = locale === LOCALES.CKB ? LOCALES.EN : LOCALES.CKB
  
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-layout__navbar">
        <Link className="dashboard-layout__navbar-language" href={asPath} locale={changeLocaleTo}>
          <LanguagesIcon className="dashboard-layout__navbar-language-icon" />
          {t("nav_language")}
        </Link>
        <div className="dashboard-layout__navbar-profile">
          <div className="dashboard-layout__navbar-profile-icon-circle">
            <PersonIcon className="dashboard-layout__navbar-profile-icon" />
          </div>
          <p className="dashboard-layout__navbar-profile-text">Person name</p>
        </div>
      </nav>
      <div className="dashboard-layout__container">
        <aside className="dashboard-layout__sidebar">
          <Link href={ROUTES.dashboard.path} className="dashboard-layout__sidebar-item">
            <HomeIcon className="dashboard-layout__sidebar-icon" />
            <p className="dashboard-layout__sidebar-text">Home</p>
          </Link>
        </aside>

        {children}
      </div>
    </div>
  )
}

export default DashboardLayout