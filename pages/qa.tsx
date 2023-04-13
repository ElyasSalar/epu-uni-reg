import Head from "next/head"
import Image from "next/image"
import { useMemo } from "react"
import Layout from "../components/Layout"
import Accordion from "../components/Accordion"
import {
  useTranslation
} from "next-i18next"
import {
  serverSideTranslations
} from "next-i18next/serverSideTranslations"
import {
  QUESTIONS_AND_ANSWERS,
} from "../shared/constants/qa"

import qaCoverImage from "../assets/images/qa-cover.jpg"

import type { Locale } from "../types/locales"
import type { NextPage } from "next"

const QA: NextPage = () => {
  const { t } = useTranslation(["qa"])

  const preparedAccordion = useMemo(() => QUESTIONS_AND_ANSWERS.map(({ question, answer }) => ({
    title: t(question),
    description: t(answer)
  })), [t])

  return (
    <Layout>
      <Head>
        <title>Q and A</title>
      </Head>
      <div className="qa">
        <section className="qa__cover">
          <Image
            src={qaCoverImage}
            alt="cover image for the questinos and answers"
            className="qa__cover-image"
          />
        </section>
        <section className="qa__questions">
          <h1 className="qa__questions-title">{t("qa_title")}</h1>
          <div className="qa__questions-container">
            <Accordion accordion={preparedAccordion} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default QA

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "qa"]))
    },
  }
}