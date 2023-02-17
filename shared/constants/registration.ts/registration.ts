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