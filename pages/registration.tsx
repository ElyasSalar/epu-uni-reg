import {
  useMemo,
  useState,
} from "react"
import {
  serverSideTranslations,
} from "next-i18next/serverSideTranslations"
import {
  useTranslation,
} from "next-i18next"
import {
  REGISTRATION_STEP_LABELS,
  MAP_FORM_STEP_TO_INFORMATIONS,
} from "../shared/constants/registration.ts/registration"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TextInput from "../components/TextInput"
import Stepper from "../components/Stepper"
import classNames from "classnames"
import {
  generalFormSchema,
  personalFormSchema,
} from "../lib/registration"

import ChevronLeft from "../assets/icons/chevron-left.svg"

import type { Locale } from "../types/locales"

const Registration = () => {
  const { t } = useTranslation("registration")
  const [stepIndex, setStepIndex] = useState<0 | 1 | 2 | 3>(0)

  const personalForm = useForm({
    mode: "onSubmit",
    resolver: yupResolver(personalFormSchema),
  })
  const generalForm = useForm({
    mode: "onSubmit",
    resolver: yupResolver(generalFormSchema),
  })

  const preparedLabels = useMemo<string[]>(() => REGISTRATION_STEP_LABELS.map((label) => t(label)), [t])

  const handlePeronsalSubmit = (data: {[key: string]: string}) => {
    console.log(data)
    setStepIndex(1)
  }

  const handleGeneralSubmit = (data: {[key: string]: string}) => {
    console.log(data)
    setStepIndex(2)
  }

  return (
    <div className="registration">
      <section className="registration__cover">{t("cover_title")}</section>
      <section className="registration__form">
        <h1 className="registration__form-title">{t("form_header_title")}</h1>
        <p className="registration__form-description">{t("form_header_description")}</p>
        <Stepper labels={preparedLabels} currentStepIndex={stepIndex} />
        <div className="registration__form-content">
          <form
            id="general"
            onSubmit={personalForm.handleSubmit(handlePeronsalSubmit)}
            className={classNames(
              "registration__form-content-form",
              { "registration__form-content-form--active": stepIndex === 1 }
            )}
          >
            <div className="registration__form-content-row">
              <TextInput
                {...personalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.email)}
                helperText={t(personalForm.formState.errors.email?.message as string)}
              />
              <TextInput
                {...personalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.email)}
                helperText={t(personalForm.formState.errors.email?.message as string)}
              />
              <TextInput
                {...personalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.email)}
                helperText={t(personalForm.formState.errors.email?.message as string)}
              />
            </div>
            <div className="registration__form-content-row">
              <TextInput
                {...personalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.email)}
                helperText={t(personalForm.formState.errors.email?.message as string)}
              />
              <TextInput
                {...personalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.email)}
                helperText={t(personalForm.formState.errors.email?.message as string)}
              />
              <TextInput
                {...personalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.email)}
                helperText={t(personalForm.formState.errors.email?.message as string)}
              />
            </div>
          </form>
          <form
            id="general"
            onSubmit={generalForm.handleSubmit(handleGeneralSubmit)}
            className={classNames(
              "registration__form-content-form",
              { "registration__form-content-form--active": stepIndex === 0 }
            )}
          >
            <div className="registration__form-content-row">
              <TextInput
                {...generalForm.register("nationality")}
                size="large"
                label={t("form_nationality_label")}
                placeholder={t("form_nationality_placeholder")}
                isErrored={Boolean(generalForm.formState.errors.nationality)}
                helperText={t(generalForm.formState.errors.nationality?.message as string)}
              />
              <TextInput
                {...generalForm.register("language")}
                size="large"
                label={t("form_language_label")}
                placeholder={t("form_language_placeholder")}
                isErrored={Boolean(generalForm.formState.errors.language)}
                helperText={t(generalForm.formState.errors.language?.message as string)}
              />
              <TextInput
                {...generalForm.register("religion")}
                size="large"
                label={t("form_religion_label")}
                placeholder={t("form_religion_placeholder")}
                isErrored={Boolean(generalForm.formState.errors.religion)}
                helperText={t(generalForm.formState.errors.religion?.message as string)}
              />
            </div>
            <div className="registration__form-content-row">
              <TextInput
                {...generalForm.register("phoneNumber")}
                size="large"
                label={t("form_personal_phone_number_label")}
                placeholder={t("form_personal_phone_number_placeholder")}
                isErrored={Boolean(generalForm.formState.errors.phoneNumber)}
                helperText={t(generalForm.formState.errors.phoneNumber?.message as string)}
              />
              <TextInput
                {...generalForm.register("familyPhoneNumber")}
                size="large"
                label={t("form_family_member_phone_number_label")}
                placeholder={t("form_family_member_phone_number_placeholder")}
                isErrored={Boolean(generalForm.formState.errors.familyPhoneNumber)}
                helperText={t(generalForm.formState.errors.familyPhoneNumber?.message as string)}
              />
              <TextInput
                {...generalForm.register("email")}
                size="large"
                label={t("form_email_label")}
                placeholder={t("form_email_placeholder")}
                isErrored={Boolean(generalForm.formState.errors.email)}
                helperText={t(generalForm.formState.errors.email?.message as string)}
              />
            </div>
          </form>
          <div className="registration__form-buttons">
            <button className="button button--secondary registration__form-buttons-negative" type="button">
              {stepIndex !== 0 && (
                <ChevronLeft className="registration__form-buttons-icon registration__form-buttons-negative-icon" />
              )}
              {t(MAP_FORM_STEP_TO_INFORMATIONS[stepIndex].negativeButton)}
            </button>
            <button
              type="submit"
              form={MAP_FORM_STEP_TO_INFORMATIONS[stepIndex].formId}
              className="button button--primary registration__form-buttons-positive"
            >
              {stepIndex !== 3 && (
                <ChevronLeft className="registration__form-buttons-icon registration__form-buttons-positive-icon" />
              )}
              {t(MAP_FORM_STEP_TO_INFORMATIONS[stepIndex].positiveButton)}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Registration

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "registration"]))
    },
  }
}