import DbConnection from "./connection"

import type { RegistrationFormData } from "../types/registration"

export default class StudentsRepository {
  static async registerStudent(studentDocument: RegistrationFormData) {
    const connection = await DbConnection.getConnection()

    const {
      firstName,
      secondName,
      thirdName,
      departmentId,
      serialNumber,
      nationality,
      language,
      religion,
      phoneNumber,
      familyPhoneNumber,
      email,
      bailId,
      schoolGraduationCertificateId,
      instituteGraduationCertificateId,
      chieftainApprovalId,
      securitySupportId,
      nationalityCardId,
      informationCardId,
      rationCardId,
      nationalityCertificateId,
      identityCardId,
    } = studentDocument

    const [response] = await connection.query(`
      INSERT INTO students(
        firstName,
        secondName,
        thirdName,
        departmentId,
        serialNumber,
        nationality,
        language,
        religion,
        phoneNumber,
        familyPhoneNumber,
        email,
        bailId,
        schoolGraduationCertificateId,
        instituteGraduationCertificateId,
        chieftainApprovalId,
        securitySupportId,
        nationalityCardId,
        informationCardId,
        rationCardId,
        nationalityCertificateId,
        identityCardId
      )
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        firstName,
        secondName,
        thirdName,
        Number(departmentId),
        serialNumber,
        nationality,
        language,
        religion,
        Number(phoneNumber),
        Number(familyPhoneNumber),
        email,
        bailId,
        schoolGraduationCertificateId,
        instituteGraduationCertificateId,
        chieftainApprovalId,
        securitySupportId,
        nationalityCardId,
        informationCardId,
        rationCardId,
        nationalityCertificateId,
        identityCardId,
      ]
    )

    return response
  }
}