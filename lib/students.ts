import type { Student } from "../types/student"

export const generateFileIdsFromStudent = (student: Student): {
  name: string
  fileId: string
}[] => {
  return [
    {
      name: "bail",
      fileId: student.bailId,
    },
    {
      name: "school certificate",
      fileId: student.schoolGraduationCertificateId,
    },
    {
      name: "institute certificate",
      fileId: student.instituteGraduationCertificateId,
    },
    {
      name: "chieftain approval",
      fileId: student.chieftainApprovalId,
    },
    {
      name: "security support",
      fileId: student.securitySupportId,
    },
    {
      name: "nationality card",
      fileId: student.nationalityCardId,
    },
    {
      name: "information card",
      fileId: student.informationCardId,
    },
    {
      name: "ration card",
      fileId: student.rationCardId,
    },
    {
      name: "nationality certificate",
      fileId: student.nationalityCertificateId,
    },
    {
      name: "identity card",
      fileId: student.identityCardId,
    },
  ]
}