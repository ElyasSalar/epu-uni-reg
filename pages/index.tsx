import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import Layout from "../components/Layout"
import {
  useTranslation
} from "next-i18next"
import {
  ROUTES
} from "../shared/constants/routes"
import {
  MarkerF,
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api"
import {
  serverSideTranslations
} from "next-i18next/serverSideTranslations"
import {
  HOME_DESCRIBE_CARDS,
  HOME_DESCRIBE_FEATURES,
} from "../shared/constants/home/home"
import {
  EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG,
  ERBIL_TECHNICAL_ENGINEERING_COLLAGE,
  LIBRARIES_MAP_SCRIPT_OPTIONS,
} from "../shared/constants/map"

import RightArrowIcon from "../assets/icons/right-arrow.svg"
import epuLogoImage from "../assets/images/epu-logo.png"

import type { Locale } from "../types/locales"
import type { NextPage } from "next"

const Home: NextPage = () => {
  const { t } = useTranslation(["home"])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: LIBRARIES_MAP_SCRIPT_OPTIONS,
  })

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
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
              <Link href={ROUTES.onlineRegistration.path} className="home__cover-content-primary button button--primary">
                {t("cover_content_primary_button")}
              </Link>
              <Link href={ROUTES.instructions.path} className="home__cover-content-secondary button button--secondary">
                {t("cover_content_secondary_button")}
                <RightArrowIcon className="home__cover-content-secondary-icon" />
              </Link>
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
        <section className="home__mockup">
          <div className="home__mockup-content">
            <h2 className="home__mockup-content-title">{t("mockup_title")}</h2>
            <p className="home__mockup-content-description">{t("mockup_description")}</p>
          </div>
        </section>
        <section className="home__location">
          <div className="home__location-content">
            <h2 className="home__location-content-title">{t("location_title")}</h2>
            <p className="home__location-content-description">{t("location_description")}</p>
          </div>
          <div className="home__location-map">
            {isLoaded && (
              <GoogleMap
                options={{
                  disableDefaultUI: false,
                  clickableIcons: true,
                  scrollwheel: false,
                }}
                zoom={15}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG[ERBIL_TECHNICAL_ENGINEERING_COLLAGE]}
              >
                <MarkerF position={EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG[ERBIL_TECHNICAL_ENGINEERING_COLLAGE]} />
              </GoogleMap>
            )}
          </div>
        </section>
      </div>
    </Layout>
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