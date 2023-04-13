import Head from "next/head"
import Image from "next/image"
import Layout from "../components/Layout"
import {
  useTranslation
} from "next-i18next"
import {
  serverSideTranslations
} from "next-i18next/serverSideTranslations"
import MapCard from "../components/MapCard"
import {
  EPU_COLLAGES,
  MAP_COLLAGES_AND_INSTITUTES_INFO,
  EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG,
  EPU_INSTITUTES,
} from "../shared/constants/map"
import { redirecToMap } from "../lib/map"

import mapCoverImage from "../assets/images/map-cover.jpg"

import type { Locale } from "../types/locales"
import type { NextPage } from "next"

const Locations: NextPage = () => {
  const { t } = useTranslation(["locations"])

  return (
    <Layout>
      <Head>
        <title>Locations</title>
      </Head>
      <div className="locations">
        <section className="locations__cover">
          <Image
            src={mapCoverImage}
            alt="cover image for the map"
            className="locations__cover-image"
          />
        </section>
        <section className="locations__maps">
          <h1 className="locations__maps-title">{t("locations_title")}</h1>
          <div className="locations__maps-container">
            {EPU_COLLAGES.map((collage) => (
              <MapCard
                key={collage}
                image={MAP_COLLAGES_AND_INSTITUTES_INFO[collage].image}
                title={t(MAP_COLLAGES_AND_INSTITUTES_INFO[collage].name)}
                mapPoint={EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG[collage]}
                location={t(MAP_COLLAGES_AND_INSTITUTES_INFO[collage].address)}
                href={redirecToMap(EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG[collage])}
              />
            ))}
            <div className="locations__maps-divider">
              <div className="locations__maps-divider-line" />
              <p className="locations__maps-divider-text">{t("locations_divider_title")}</p>
              <div className="locations__maps-divider-line" />
            </div>
            {EPU_INSTITUTES.map((collage) => (
              <MapCard
                key={collage}
                image={MAP_COLLAGES_AND_INSTITUTES_INFO[collage].image}
                title={t(MAP_COLLAGES_AND_INSTITUTES_INFO[collage].name)}
                mapPoint={EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG[collage]}
                location={t(MAP_COLLAGES_AND_INSTITUTES_INFO[collage].address)}
                href={redirecToMap(EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG[collage])}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Locations

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "locations"]))
    },
  }
}