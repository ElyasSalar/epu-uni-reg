import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import {
  serverSideTranslations,
} from "next-i18next/serverSideTranslations"
import { useState } from "react"
import {
  useTranslation,
} from "next-i18next"
import { ROUTES } from "../../shared/constants/routes"
import TextInput from "../../components/TextInput"
import { login } from "../../endpoints/auth"
import { saveToken } from "../../lib/auth"

import epuLogo from "../../assets/images/epu-logo.png"

import type { NextPage } from "next"
import type { Locale } from "../../types/locales"
import type { LoginForm } from "../../types/login"

const Login: NextPage = () => {
  const { replace } = useRouter()
  const { t } = useTranslation("login")
  const { register, formState, handleSubmit } = useForm<LoginForm>({
    mode: "onSubmit",
  })
  const [loginError, setLoginError] = useState<string>("")

  const submitHandler = async (data: LoginForm) => {
    try {
      const response = await login(data)
      if (response.status === 200) {
        setLoginError("")
        saveToken(response.data.token)
        replace(ROUTES.students.path)
      }
    } catch (error: any) {
      setLoginError(error.response.data.message)
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(submitHandler)}>
        <div className="login__form-header">
          <Image
            src={epuLogo}
            alt="EPU Logo"
            className="login__form-logo"
          />
          <h1 className="login__form-title">{t("login_form_title")}</h1>
        </div>
        <TextInput
          {...register("username")}
          size="large"
          label={t("login_username_label")}
          placeholder={t("login_username_placeholder")}
          helperText={t(formState.errors.username?.message as string)}
        />
        <TextInput
          {...register("password")}
          size="large"
          type="password"
          label={t("login_password_label")}
          placeholder={t("login_password_placeholder")}
          helperText={t(formState.errors.password?.message as string)}
        />
        <button
          type="submit"
          className="button button--primary login__form-submit"
        >
          {t("login_button")}
        </button>
        {loginError && (
          <div className="login__form-message">{loginError}</div>
        )}
      </form>
    </div>
  )
}

export default Login

export async function getStaticProps({ locale }: { locale: Locale }) {
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login"])),
    },
  }
}