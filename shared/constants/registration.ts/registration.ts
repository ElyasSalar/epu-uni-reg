export const REGISTRATION_STEP_LABELS: string[] = [
  "form_step_1",
  "form_step_2",
  "form_step_3",
  "form_step_4",
]

export const MAP_FORM_STEP_TO_INFORMATIONS: {
  formId: string
  negativeButton: string
  positiveButton: string
}[] = [
  {
    formId: "personal",
    negativeButton: "form_cancel_button",
    positiveButton: "form_next_button",
  },
  {
    formId: "general",
    negativeButton: "form_back_button",
    positiveButton: "form_next_button",
  },
  {
    formId: "educational-documents",
    negativeButton: "form_back_button",
    positiveButton: "form_next_button",
  },
  {
    formId: "personal-documents",
    negativeButton: "form_back_button",
    positiveButton: "form_submit_button",
  },
]

export const REGISTRATION_GRADUATION_TYPE_SCHOOL = "form_graduated_from_school"
export const REGISTRATION_GRADUATION_TYPE_INSTITUTE = "form_graduated_from_institute"

export const REGISTRATION_GRADUATION_TYPE: string[] = [
  REGISTRATION_GRADUATION_TYPE_SCHOOL,
  REGISTRATION_GRADUATION_TYPE_INSTITUTE,
]

export const PERSONAL_DOCUMENT_OPTION_1 = "form_personal_document_option_one"
export const PERSONAL_DOCUMENT_OPTION_2 = "form_personal_document_option_two"

export const PERSONAL_DOCUMENT_OPTIONS: string[] = [
  PERSONAL_DOCUMENT_OPTION_1,
  PERSONAL_DOCUMENT_OPTION_2,
]