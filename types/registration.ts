import { DropdownOption } from "./dropdown"

export type RegistrationStep1 = {
  firstName: string
  secondName: string
  thirdName: string
  collage: DropdownOption
  department: DropdownOption
  serialNumber: number
}

export type RegistrationStep2 = {
  nationality: string
  language: string
  religion: string
  email: string
  phoneNumber: number
  familyPhoneNumber: number
}

export type RegistrationStep3 = {
  instituteGraduationCertificateId?: string
  schoolGraduationCertificateId?: string
  chieftainApprovalId: string
  securitySupportId: string
  bailId: string
}

export type RegistrationStep4 = {
  nationalityCertificateId: string
  nationalityCardId: string
  informationCardId: string
  identityCardId: string
  rationCardId: string
}

export type RegistrationFormData = Omit<Omit<RegistrationStep1, "collage">, "department"> & {
  departmentId: string
} & RegistrationStep2 & RegistrationStep3 & RegistrationStep4