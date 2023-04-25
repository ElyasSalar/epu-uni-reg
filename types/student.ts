export type Student = {
  id: string,
  firstName: string,
  secondName: string,
  thirdName: string,
  departmentId: string,
  serialNumber: string,
  nationality: string,
  language: string,
  religion: string,
  phoneNumber: number,
  familyPhoneNumber: number,
  email: string,
  bailId: string,
  schoolGraduationCertificateId: string,
  instituteGraduationCertificateId: string,
  chieftainApprovalId: string,
  securitySupportId: string,
  nationalityCardId: string,
  informationCardId: string,
  rationCardId: string,
  nationalityCertificateId: string,
  identityCardId: string,
  reigsteredAt: Date,
}

export type GetStudentsParams = {
  searchQuery?: string,
  page: number,
  size: number,
}

export type GetStudentsApiResponse = Omit<
  Student,
  "departmentId" |
  "nationality" |
  "language" |
  "religion" |
  "familyPhoneNumber" |
  "email" |
  "bailId" |
  "schoolGraduationCertificateId" |
  "instituteGraduationCertificateId" |
  "chieftainApprovalId" |
  "securitySupportId" |
  "nationalityCardId" |
  "informationCardId" |
  "rationCardId" |
  "nationalityCertificateId" |
  "identityCardId" |
  "reigsteredAt"
> & {
  department: string
  collage: string
}