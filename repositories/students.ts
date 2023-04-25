import DbConnection from "./connection"
import { NoEntryError } from "../config/apiError"

import type { OkPacket, RowDataPacket } from "mysql2"
import type { GetStudentsApiResponse } from "../types/student"
import type { RegistrationFormData } from "../types/registration"
import type { WithPagination } from "../types/general"

interface GetStudentsResponse extends RowDataPacket, GetStudentsApiResponse {}

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
        departmentId,
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
    searchQuery,
    offset = 0,
    limit = 15,
  }: {
    searchQuery: string,
    offset?: number,
    limit?: number,
  }): Promise<WithPagination<GetStudentsResponse>> {
    const connection = await DbConnection.getConnection()

    try {
      const [[studentsCount]] = await connection.query<GetStudentsResponse[]>(`
        SELECT
          COUNT(*) as totalElements
        FROM students as s
        JOIN departments as d ON d.id = s.departmentId
        JOIN collages as c ON c.id = d.collageId
        WHERE CONCAT_WS(
          " ", s.firstName,
          s.secondName,
          s.thirdName,
          s.serialNumber,
          s.phoneNumber,
          d.englishDepartmentName,
          c.englishCollageName
        ) LIKE '%${searchQuery}%'
      `)
      const [students] = await connection.query<GetStudentsResponse[]>(`
        SELECT
          s.id,
          s.firstName,
          s.secondName,
          s.thirdName,
          s.serialNumber,
          c.englishCollageName as collage,
          d.englishDepartmentName as department,
          s.phoneNumber
          FROM students as s
          JOIN departments as d ON d.id = s.departmentId
          JOIN collages as c ON c.id = d.collageId
          WHERE CONCAT_WS(
            " ", s.firstName,
            s.secondName,
            s.thirdName,
            s.serialNumber,
            s.phoneNumber,
            d.englishDepartmentName,
            c.englishCollageName
          ) LIKE '%${searchQuery}%'
          LIMIT ${offset},${limit}
      `)
      return {
        size: limit,
        page: offset,
        content: students,
        totalElements: studentsCount.totalElements,
        totalPages: Math.ceil(studentsCount.totalElements / limit),
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteStudentById({ id }: { id: string }): Promise<undefined> {
    const connection = await DbConnection.getConnection()

    try {
      const [response] = await connection.query<OkPacket>(`
        DELETE FROM students WHERE id = ${id}
      `)

      if (response.affectedRows === 0) {
        throw new NoEntryError()
      }

      return undefined
    } catch (error) {
      throw error
    }
  }
}