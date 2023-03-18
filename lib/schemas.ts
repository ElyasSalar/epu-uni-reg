import * as yup from "yup";
import { ONLY_NUMBERS_REGEX } from "../shared/constants/regex";

export const phoneNumberSchema = yup
  .string()
  .matches(ONLY_NUMBERS_REGEX ,"form_error_phonenumber_type")
  .length(11, "form_error_phonenumber_length")