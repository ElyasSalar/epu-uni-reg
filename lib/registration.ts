import * as yup from "yup";
import {
  PERSONAL_DOCUMENT_OPTION_1,
  PERSONAL_DOCUMENT_OPTION_2,
  REGISTRATION_GRADUATION_TYPE_SCHOOL,
  REGISTRATION_GRADUATION_TYPE_INSTITUTE,
} from "../shared/constants/registration.ts/registration";
import { phoneNumberSchema } from "./schemas";

export const personalFormSchema = yup.object({
  firstName: yup.string().required("form_error_required"),
  secondName: yup.string().required("form_error_required"),
  thirdName: yup.string().required("form_error_required"),
  collage: yup.object({
    id: yup.string().required("form_error_required"),
    text: yup.string().required("form_error_required"),
  }).required("form_error_required"),
  department: yup.object({
    id: yup.string().required("form_error_required"),
    text: yup.string().required("form_error_required"),
  }).required("form_error_required"),
  serialNumber: yup
    .number()
    .transform((value) => !Number.isNaN(Number(value)) ? Number(value) : undefined)
    .required("form_error_required")
    .positive()
    .integer(),
})


export const generalFormSchema = yup.object({
  nationality: yup.string().required("form_error_required"),
  language: yup.string().required("form_error_required"),
  religion: yup.string().required("form_error_required"),
  email: yup.string().email("form_email_error_match").required("form_error_required"),
  phoneNumber: phoneNumberSchema.required("form_error_required"),
  familyPhoneNumber: phoneNumberSchema.required("form_error_required"),
})


export const educationalDocumentsFormSchema = (graduationType: string) => yup.object({
  instituteGraduationCertificateId: yup.string().when(
    (_, schema) => {
      if (graduationType === REGISTRATION_GRADUATION_TYPE_SCHOOL) return schema.notRequired()
      return schema.required("form_error_required")
    }
  ),
  schoolGraduationCertificateId: yup.string().when(
    (_, schema) => {
      if (graduationType === REGISTRATION_GRADUATION_TYPE_INSTITUTE) return schema.notRequired()
      return schema.required("form_error_required")
    }
  ),
  chieftainApprovalId: yup.string().required("form_error_required"),
  securitySupportId: yup.string().required("form_error_required"),
  bailId: yup.string().required("form_error_required"),
})


const personalDocumentOption1Schema = (option: string) => yup.string().when(
  (_, schema) => {
    if (option === PERSONAL_DOCUMENT_OPTION_1) return schema.notRequired()
    return schema.required("form_error_required")
  }
)

const personalDocumentOption2Schema = (option: string) => yup.string().when(
  (_, schema) => {
    if (option === PERSONAL_DOCUMENT_OPTION_2) return schema.notRequired()
    return schema.required("form_error_required")
  }
)

export const personalDocumentsFormSchema = (option: string) => yup.object({
  nationalityCertificateId: personalDocumentOption1Schema(option),
  identityCardId: personalDocumentOption1Schema(option),
  nationalityCardId: personalDocumentOption2Schema(option),
  informationCardId: personalDocumentOption2Schema(option),
  rationCardId: personalDocumentOption2Schema(option),
})