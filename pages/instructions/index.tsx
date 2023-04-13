import Head from "next/head"
import Image from "next/image"
import { useMemo } from "react"
import Layout from "../../components/Layout"
import InstructionsCards from "../../components/InstructionsCard"
import {
  useTranslation
} from "next-i18next"
import {
  serverSideTranslations
} from "next-i18next/serverSideTranslations"
import {
  INSTRUCTIONS,
} from "../../shared/constants/instructions"

import instructionsCoverImage from "../../assets/images/instructions-cover.jpg"

import type { Locale } from "../../types/locales"
import type { NextPage } from "next"

const Instructions: NextPage = () => {
  const { t } = useTranslation(["instructions"])

  const preparedInstructions = useMemo(() => INSTRUCTIONS.map(({ title, description, ...props }) => ({
    title: t(title),
    description: t(description),
    ...props,
  })), [t])

  return (
    <Layout>
      <Head>
        <title>Instructions</title>
      </Head>
      <div className="instructions">
        <section className="instructions__cover">
          <Image
            src={instructionsCoverImage}
            alt="cover image for the instructions"
            className="instructions__cover-image"
          />
        </section>
        <section className="instructions__instructions">
          <h1 className="instructions__instructions-title">{t("instructions_title")}</h1>
          <div className="instructions__instructions-container">
            {preparedInstructions.map(({ title, description, href }) => (
              <InstructionsCards key={href} href={href} title={title} description={description} />
            ))}
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