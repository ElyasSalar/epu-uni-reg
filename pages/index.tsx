import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import RightArrowIcon from "../assets/icons/right-arrow.svg"
import epuLogoImage from "../assets/images/epu-logo.png"

import type { Locale } from "../types/locales"
import { HOME_DESCRIBE_CARDS, HOME_DESCRIBE_FEATURES } from "../shared/constants/home/home"
import Link from "next/link"
import { ROUTES } from "../shared/constants/routes"

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
      <section className="home__describe">
        <div className="home__describe-steps">
          <div className="home__describe-steps-explanation">
            <p className="home__describe-steps-explanation-tag">
              {t("describe_explanation_tag")}
            </p>
            <h2 className="home__describe-steps-explanation-title">
              {t("describe_explanation_title")}
            </h2>
            <p className="home__describe-steps-explanation-description">
              {t("describe_explanation_description")}
            </p>
            <Link href={ROUTES.instructions.path} className="home__describe-steps-explanation-button button button--secondary">
              {t("describe_explanation_button_text")}
            </Link>
          </div>
          <div className="home__describe-steps-cards">
            <div className="home__describe-steps-card-vertical">
              {HOME_DESCRIBE_CARDS.slice(0, 2).map(({ title, description }) => (
                <div key={title} className="home__describe-steps-card">
                  <h3 className="home__describe-steps-card-title">{t(title)}</h3>
                  <p className="home__describe-steps-card-description">{t(description)}</p>
                </div>
              ))}
            </div>
            <div className="home__describe-steps-card-vertical">
              {HOME_DESCRIBE_CARDS.slice(2).map(({ title, description }) => (
                <div key={title} className="home__describe-steps-card">
                  <h3 className="home__describe-steps-card-title">{t(title)}</h3>
                  <p className="home__describe-steps-card-description">{t(description)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="home__describe-features">
          {HOME_DESCRIBE_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="home__describe-features-card">
              <Icon className="home__describe-features-card-icon" />
              <p className="home__describe-features-card-text">{t(text)}</p>
            </div>
          ))}
        </div>
      </section>
      {/* TODO: start from the new section from here */}
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