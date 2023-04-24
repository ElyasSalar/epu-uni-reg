import jwt from "jsonwebtoken"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { DEFAULT_LOCALE } from "../../shared/constants/locale"
import { ROUTES } from "../../shared/constants/routes"

import type { NextPage, GetServerSidePropsContext } from "next"
import type { Locale } from "../../types/locales"

const Dashboard: NextPage = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps({ locale, req }: GetServerSidePropsContext<{ locale: Locale }>) {
  const redirectToLogin = {
    redirect: {
      destination: ROUTES.dashboard.login.path,
      permanent: false,
    },
  }
  if (req.cookies.accessToken === undefined) return redirectToLogin

  const user = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY as string)
  
  if (user === null) return redirectToLogin

  return {
    props: {
      ...(await serverSideTranslations(locale ?? DEFAULT_LOCALE, ["common", "login"])),
    },
  }
}