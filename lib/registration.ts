import * as yup from "yup";
import { phoneNumberSchema } from "./schemas";

export const personalFormSchema = yup.object({
  firstName: yup.string().required("form_error_required"),
  secondName: yup.string().required("form_error_required"),
  thirdName: yup.string().required("form_error_required"),
  collage: yup.string().email("form_email_error_match").required("form_error_required"),
  department: phoneNumberSchema,
  serialNumber: phoneNumberSchema,
})

export const generalFormSchema = yup.object({
  nationality: yup.string().required("form_error_required"),
  language: yup.string().required("form_error_required"),
  religion: yup.string().required("form_error_required"),
  email: yup.string().email("form_email_error_match").required("form_error_required"),
  phoneNumber: phoneNumberSchema,
  familyPhoneNumber: phoneNumberSchema,
})