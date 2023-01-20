import Image from "next/image"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import RightArrowIcon from "../assets/icons/right-arrow.svg"
import epuLogoImage from "../assets/images/epu-logo.png"

import type { Locale } from "../types/locales"

const Home = () => {
  const router = useRouter()
  const { t } = useTranslation("home")

  const primaryClickHandler = () => {
    router.replace("#")
  }

  const secondaryClickHandler = () => {
    router.replace("#")
  }

  return (
    <div className="home">
      <section className="home__cover">
        <center className="home__cover-content">
          <Image
            priority
            quality={25}
            alt="epu logo"
            loading="eager"
            src={epuLogoImage}
            className="home__cover-content-logo"
          />
          <h1 className="home__cover-content-title">{t("cover_content_title")}</h1>
          <h4 className="home__cover-content-subtitle">{t("cover_content_subtitle")}</h4>
          <div className="home__cover-content-buttons">
            <button className="home__cover-content-primary button button--primary" onClick={primaryClickHandler}>
              {t("cover_content_primary_button")}
            </button>
            <button className="home__cover-content-secondary button button--secondary" onClick={secondaryClickHandler}>
              {t("cover_content_secondary_button")}
              <RightArrowIcon className="home__cover-content-secondary-icon" />
            </button>
          </div>
        </center>
      </section>
    </div>
  )
}

export default Home

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"]))
    },
  }
}