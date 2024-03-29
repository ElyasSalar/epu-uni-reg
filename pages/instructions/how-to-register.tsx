import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import {
  useTranslation
} from "next-i18next"
import {
  serverSideTranslations
} from "next-i18next/serverSideTranslations"
import { translateNumber } from "../../lib/locale"
import { ROUTES } from "../../shared/constants/routes"

import instructionsCoverImage from "../../assets/images/instructions-cover.jpg"

import type { Locale } from "../../types/locales"
import type { NextPage } from "next"

const Instructions: NextPage = () => {
  const { t } = useTranslation(["instructions"])
  const { locale } = useRouter()

  return (
    <Layout>
      <Head>
        <title>How to register</title>
      </Head>
      <div className="instructions">
        <section className="instructions__cover">
          <Image
            src={instructionsCoverImage}
            alt="cover image for the instructions"
            className="instructions__cover-image"
          />
        </section>
        <section className="instructions__content">
          <h1 className="instructions__content-title">{t("instructions_register_title")}</h1>
          <div className="instructions__content-container">
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(1, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph1")}
                <Link href={ROUTES.onlineRegistration.path}>{t("instructions_register_paragraph1_link")}</Link>
              </p>
            </div>
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(2, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph2")}
              </p>
            </div>
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(3, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph3")}
              </p>
            </div>
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(4, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph4")}
              </p>
            </div>
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(5, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph5")}
              </p>
            </div>
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(6, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph6")}
              </p>
            </div>
            <div className="instructions__content-paragraph">
              <div className="instructions__content-paragraph-icon"><span>{translateNumber(7, locale)}</span></div>
              <p className="instructions__content-paragraph-text">
                {t("instructions_register_paragraph7")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Instructions

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "instructions"]))
    },
  }
}