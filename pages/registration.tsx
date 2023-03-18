import {
  useMemo,
  useRef,
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
  REGISTRATION_GRADUATION_TYPE,
  MAP_FORM_STEP_TO_INFORMATIONS,
  REGISTRATION_GRADUATION_TYPE_SCHOOL,
  REGISTRATION_GRADUATION_TYPE_INSTITUTE,
  PERSONAL_DOCUMENT_OPTION_1,
  PERSONAL_DOCUMENT_OPTION_2,
  PERSONAL_DOCUMENT_OPTIONS,
} from "../shared/constants/registration.ts/registration"
import {
  useForm,
  Controller,
} from "react-hook-form"
import {
  yupResolver,
} from "@hookform/resolvers/yup"
import {
  educationalDocumentsFormSchema,
  generalFormSchema,
  personalDocumentsFormSchema,
  personalFormSchema,
} from "../lib/registration"
import DepartmentsController from "../repositories/departments"
import { LOCALE_DIR } from "../shared/constants/locale"
import { getDepartments } from "../api/departments"
import TextInput from "../components/TextInput"
import Dropdown from "../components/Dropdown"
import Stepper from "../components/Stepper"
import { useRouter } from "next/router"
import classNames from "classnames"

import ChevronLeft from "../assets/icons/chevron-left.svg"
import ChevronRight from "../assets/icons/chevron-right.svg"

import type { Locale } from "../types/locales"
import type { RegistrationFormData, RegistrationStep1, RegistrationStep2, RegistrationStep3, RegistrationStep4 } from "../types/registration"
import type { Department } from "../types/departments"
import RadioGroup from "../components/RadioGroup"
import UploadInput from "../components/UploadInput"
import { ROUTES } from "../shared/constants/routes"
import { registerStudent } from "../api/students"

const Registration = ({
  collages
}: {
  collages: Department[]
}) => {
  const { locale, replace } = useRouter()
  const dir = LOCALE_DIR[locale]
  const { t } = useTranslation("registration")
  const [stepIndex, setStepIndex] = useState<0 | 1 | 2 | 3>(0)
  const [departments, setDepartments] = useState<Department[]>([])
  const [graduationType, setGraduationType] = useState<string>(REGISTRATION_GRADUATION_TYPE_SCHOOL)
  const [personalDocumentsType, setPersonalDocumentsType] = useState<string>(PERSONAL_DOCUMENT_OPTION_1)
  
  const studentData = useRef<Partial<RegistrationFormData>>({})
  console.log(studentData.current)

  const preparedCollageOptions = useMemo(
    () => collages.map(({
      collageCode,
      collage,
    }) => ({
      id: collageCode,
      text: collage,
    }))
    ,[collages]
  )

  const preparedDepartmentOptions = useMemo(
    () => departments.map(({ id, department }) => ({ id, text: department }))
    ,[departments]
  )
  
  const preparedLabels = useMemo<string[]>(() => REGISTRATION_STEP_LABELS.map((label) => t(label)), [t])

  const personalForm = useForm<RegistrationStep1>({
    mode: "onSubmit",
    resolver: yupResolver(personalFormSchema),
  })
  const collage = personalForm.register("collage")
  const department = personalForm.register("department")

  const generalForm = useForm<RegistrationStep2>({
    mode: "onSubmit",
    resolver: yupResolver(generalFormSchema),
  })

  const educationalDocumentsForm = useForm<RegistrationStep3>({
    mode: "onSubmit",
    resolver: yupResolver(educationalDocumentsFormSchema(graduationType)),
  })
  const educationalDocumentsErrors = educationalDocumentsForm.formState.errors

  const instituteGraduationCertificateId = educationalDocumentsForm.register("instituteGraduationCertificateId")
  const schoolGraduationCertificateId = educationalDocumentsForm.register("schoolGraduationCertificateId")
  const chieftainApprovalId = educationalDocumentsForm.register("chieftainApprovalId")
  const securitySupportId = educationalDocumentsForm.register("securitySupportId")
  const bailId = educationalDocumentsForm.register("bailId")
  
  const personalDocumentsForm = useForm<RegistrationStep4>({
    mode: "onSubmit",
    resolver: yupResolver(personalDocumentsFormSchema(personalDocumentsType)),
  })
  const personalDocumentsErrors = personalDocumentsForm.formState.errors

  const nationalityCertificateId = personalDocumentsForm.register("nationalityCertificateId")
  const nationalityCardId = personalDocumentsForm.register("nationalityCardId")
  const informationCardId = personalDocumentsForm.register("informationCardId")
  const identityCardId = personalDocumentsForm.register("identityCardId")
  const rationCardId = personalDocumentsForm.register("rationCardId")

  const handleCollageChange = (onChange: any) => async (selectedCollage: typeof preparedCollageOptions[0]) => {
    onChange(selectedCollage)
    
    if (!selectedCollage.id) return

    const departments = await getDepartments({
      collageCode: selectedCollage.id,
      locale,
    })

    setDepartments(departments.data)
  }

  const handlePeronsalSubmit = (data: RegistrationStep1) => {
    studentData.current = {
      ...studentData.current,
      firstName: data.firstName,
      secondName: data.secondName,
      thirdName: data.thirdName,
      serialNumber: Number(data.serialNumber),
      departmentId: Number(data.department.id),
    }
    setStepIndex(1)
  }

  const handleGeneralSubmit = (data: RegistrationStep2) => {
    studentData.current = {
      ...studentData.current,
      ...data,
      phoneNumber: Number(data.phoneNumber),
      familyPhoneNumber: Number(data.familyPhoneNumber),
    }
    setStepIndex(2)
  }

  const handleEducationalDocumentsSubmit = (data: RegistrationStep3) => {
    studentData.current = {
      ...studentData.current,
      ...data,
    }
    setStepIndex(3)
  }

  const handlePersonalDocumentsSubmit = async (data: RegistrationStep4) => {
    studentData.current = {
      ...studentData.current,
      ...data,
    }

    try {
      await registerStudent(studentData.current)
      replace(ROUTES.onlineRegistration.path)
      studentData.current = {}
    } catch {
      replace(ROUTES.onlineRegistration.path)
    }
  }

  const handleBack = () => {
    if (stepIndex === 0) {
      replace(ROUTES.home.path)
      return
    }
    
    setStepIndex(stepIndex - 1 as 1 | 2 | 3)
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
            id={"personal"}
            onSubmit={personalForm.handleSubmit(handlePeronsalSubmit)}
            className={classNames(
              "registration__form-content-form",
              { "registration__form-content-form--active": stepIndex === 0 }
            )}
          >
            <div className="registration__form-content-row">
              <TextInput
                {...personalForm.register("firstName")}
                size="large"
                label={t("form_first_name_label")}
                placeholder={t("form_first_name_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.firstName)}
                helperText={t(personalForm.formState.errors.firstName?.message as string)}
              />
              <TextInput
                {...personalForm.register("secondName")}
                size="large"
                label={t("form_second_name_label")}
                placeholder={t("form_second_name_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.secondName)}
                helperText={t(personalForm.formState.errors.secondName?.message as string)}
              />
              <TextInput
                {...personalForm.register("thirdName")}
                size="large"
                label={t("form_third_name_label")}
                placeholder={t("form_third_name_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.thirdName)}
                helperText={t(personalForm.formState.errors.thirdName?.message as string)}
              />
            </div>
            <div className="registration__form-content-row">
              <Controller
                name={collage.name}
                control={personalForm.control}
                render={({ field }) => (
                  <Dropdown
                    id={collage.name}
                    selected={field.value}
                    label={t("form_collage_label")}
                    options={preparedCollageOptions}
                    placeholder={t("form_collage_placeholder")}
                    onChange={handleCollageChange(field.onChange)}
                    isErrored={Boolean(personalForm.formState.errors.collage)}
                    helperText={t(personalForm.formState.errors.collage?.text?.message as string)}
                  />
                )}
              />
              <Controller
                name={department.name}
                control={personalForm.control}
                render={({ field }) => (
                  <Dropdown
                    id={department.name}
                    selected={field.value}
                    onChange={field.onChange}
                    label={t("form_department_label")}
                    options={preparedDepartmentOptions}
                    placeholder={t("form_department_placeholder")}
                    disabled={preparedDepartmentOptions.length === 0}
                    isErrored={Boolean(personalForm.formState.errors.department)}
                    helperText={t(personalForm.formState.errors.department?.text?.message as string)}
                  />
                )}
              />
              <TextInput
                {...personalForm.register("serialNumber")}
                size="large"
                label={t("form_serial_number_label")}
                placeholder={t("form_serial_number_placeholder")}
                isErrored={Boolean(personalForm.formState.errors.serialNumber)}
                helperText={t(personalForm.formState.errors.serialNumber?.message as string)}
              />
            </div>
          </form>
          <form
            id="general"
            onSubmit={generalForm.handleSubmit(handleGeneralSubmit)}
            className={classNames(
              "registration__form-content-form",
              { "registration__form-content-form--active": stepIndex === 1 }
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
          <form
            id="educational-documents"
            onSubmit={educationalDocumentsForm.handleSubmit(handleEducationalDocumentsSubmit)}
            className={classNames(
              "registration__form-content-form",
              { "registration__form-content-form--active": stepIndex === 2 }
            )}
          >
            <RadioGroup
              onChange={setGraduationType}
              selectedOption={graduationType}
              label="form_graduated_from_labeltext"
              options={REGISTRATION_GRADUATION_TYPE}
            />
            <div className="registration__form-content-row">
              {graduationType === REGISTRATION_GRADUATION_TYPE_SCHOOL && (
                <Controller
                  name={schoolGraduationCertificateId.name}
                  control={educationalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={schoolGraduationCertificateId.name}
                      label={t("form_uploader_schoolcertificate_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(educationalDocumentsErrors.schoolGraduationCertificateId)}
                      helperText={t(educationalDocumentsErrors.schoolGraduationCertificateId?.message as string)}
                    />
                  )}
                />
              )}
              {graduationType === REGISTRATION_GRADUATION_TYPE_INSTITUTE && (
                <Controller
                  name={instituteGraduationCertificateId.name}
                  control={educationalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={instituteGraduationCertificateId.name}
                      label={t("form_uploader_institutecertificate_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(educationalDocumentsErrors.instituteGraduationCertificateId)}
                      helperText={t(educationalDocumentsErrors.instituteGraduationCertificateId?.message as string)}
                    />
                  )}
                />
              )}
              <Controller
                name={bailId.name}
                control={educationalDocumentsForm.control}
                render={({ field }) => (
                  <UploadInput
                    id={bailId.name}
                    label={t("form_uploader_bail_label")}
                    documentId={field.value}
                    setDocumentId={field.onChange}
                    isErrored={Boolean(educationalDocumentsErrors.bailId)}
                    helperText={t(educationalDocumentsErrors.bailId?.message as string)}
                  />
                )}
              />
              <Controller
                name={chieftainApprovalId.name}
                control={educationalDocumentsForm.control}
                render={({ field }) => (
                  <UploadInput
                    id={chieftainApprovalId.name}
                    label={t("form_uploader_chieftainapproval_label")}
                    documentId={field.value}
                    setDocumentId={field.onChange}
                    isErrored={Boolean(educationalDocumentsErrors.chieftainApprovalId)}
                    helperText={t(educationalDocumentsErrors.chieftainApprovalId?.message as string)}
                  />
                )}
              />
            </div>
            <div className="registration__form-content-row">
              <Controller
                name={securitySupportId.name}
                control={educationalDocumentsForm.control}
                render={({ field }) => (
                  <UploadInput
                    id={securitySupportId.name}
                    label={t("form_uploader_securitysupport_label")}
                    documentId={field.value}
                    setDocumentId={field.onChange}
                    isErrored={Boolean(educationalDocumentsErrors.securitySupportId)}
                    helperText={t(educationalDocumentsErrors.securitySupportId?.message as string)}
                  />
                )}
              />
              <div />
              <div />
            </div>
          </form>
          <form
            id="personal-documents"
            onSubmit={personalDocumentsForm.handleSubmit(handlePersonalDocumentsSubmit)}
            className={classNames(
              "registration__form-content-form",
              { "registration__form-content-form--active": stepIndex === 3 }
            )}
          >
            <RadioGroup
              onChange={setPersonalDocumentsType}
              options={PERSONAL_DOCUMENT_OPTIONS}
              selectedOption={personalDocumentsType}
              label="form_personal_document_options_label"
            />
            {personalDocumentsType === PERSONAL_DOCUMENT_OPTION_1 && (
              <div className="registration__form-content-row">
                <Controller
                  name={nationalityCardId.name}
                  control={personalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={nationalityCardId.name}
                      label={t("form_uploader_schoolcertificate_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(personalDocumentsErrors.nationalityCardId)}
                      helperText={t(personalDocumentsErrors.nationalityCardId?.message as string)}
                    />
                  )}
                />
                <Controller
                  name={informationCardId.name}
                  control={personalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={informationCardId.name}
                      label={t("form_uploader_informationcard_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(personalDocumentsErrors.informationCardId)}
                      helperText={t(personalDocumentsErrors.informationCardId?.message as string)}
                    />
                  )}
                />
                <Controller
                  name={rationCardId.name}
                  control={personalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={rationCardId.name}
                      label={t("form_uploader_rationcard_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(personalDocumentsErrors.rationCardId)}
                      helperText={t(personalDocumentsErrors.rationCardId?.message as string)}
                    />
                  )}
                />
              </div>
            )}
            {personalDocumentsType === PERSONAL_DOCUMENT_OPTION_2 && (
              <div className="registration__form-content-row">
                <Controller
                  name={nationalityCertificateId.name}
                  control={personalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={nationalityCertificateId.name}
                      label={t("form_uploader_naitonalitycertificate_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(personalDocumentsErrors.nationalityCertificateId)}
                      helperText={t(personalDocumentsErrors.nationalityCertificateId?.message as string)}
                    />
                  )}
                />
                <Controller
                  name={identityCardId.name}
                  control={personalDocumentsForm.control}
                  render={({ field }) => (
                    <UploadInput
                      id={identityCardId.name}
                      label={t("form_uploader_identitycard_label")}
                      documentId={field.value}
                      setDocumentId={field.onChange}
                      isErrored={Boolean(personalDocumentsErrors.identityCardId)}
                      helperText={t(personalDocumentsErrors.identityCardId?.message as string)}
                    />
                  )}
                />
                <div />
              </div>
            )}
          </form>
          <div className="registration__form-buttons">
            <button className="button button--secondary registration__form-buttons-negative" type="button" onClick={handleBack}>
              {stepIndex !== 0 && dir === "ltr" && (
                <ChevronLeft className="registration__form-buttons-icon registration__form-buttons-negative-icon" />
              )}
              {stepIndex !== 0 && dir === "rtl" && (
                <ChevronRight className="registration__form-buttons-icon registration__form-buttons-negative-icon" />
              )}
              {t(MAP_FORM_STEP_TO_INFORMATIONS[stepIndex].negativeButton)}
            </button>
            <button
              type="submit"
              form={MAP_FORM_STEP_TO_INFORMATIONS[stepIndex].formId}
              className="button button--primary registration__form-buttons-positive"
            >
              {t(MAP_FORM_STEP_TO_INFORMATIONS[stepIndex].positiveButton)}
              {stepIndex !== 3 && dir === "ltr" && (
                <ChevronRight className="registration__form-buttons-icon registration__form-buttons-positive-icon" />
              )}
              {stepIndex !== 3 && dir === "rtl" && (
                <ChevronLeft className="registration__form-buttons-icon registration__form-buttons-positive-icon" />
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Registration

export async function getStaticProps({ locale }: { locale: Locale }) {
  const collages = await DepartmentsController.getCollages({ locale })
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "registration"])),
      collages,
    },
  }
}

// form_uploader_nationalitycard_label
// form_uploader_informationcard_label
// form_uploader_rationcard_label
// form_uploader_naitonalitycertificate_label
// form_uploader_identitycard_label