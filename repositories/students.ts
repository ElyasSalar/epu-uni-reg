import DbConnection from "./connection"

import type { RowDataPacket } from "mysql2"
import type { Student } from "../types/student"
import type { RegistrationFormData } from "../types/registration"

interface GetStudentsResponse extends RowDataPacket, Student {}

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

  static async getStudents({
    searchQuery = "%",
    offset = 0,
    limit = 15,
  }: {
    searchQuery?: string,
    offset?: number,
    limit?: number,
  }): Promise<GetStudentsResponse[]> {
    const connection = await DbConnection.getConnection()

    try {
      const [response] = await connection.query<GetStudentsResponse[]>(`
        SELECT * FROM students
          WHERE phoneNumber LIKE '${searchQuery}'
          LIMIT ${offset},${limit}
      `)
      return response
    } catch (error) {
      throw error
    }
  }
}