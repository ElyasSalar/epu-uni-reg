import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { Locale } from "../types/locales"

const Qa = () => {
  return (
    <div style={{ backgroundColor: "blue", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "100px" }}>
      🐈
    </div>
  )
}

export default Qa


export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  }
}