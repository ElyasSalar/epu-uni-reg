import DbConnection from "./connection"
import { BadRequestError } from "../config/apiError"
import { MAP_LOCALE_TO_DEPARTMENT_NAME } from "../shared/constants/departments"

import type { Department } from "../types/departments"
import type { Locale } from "../types/locales"
import type { RowDataPacket } from "mysql2"

interface GetDepartmentsResult extends RowDataPacket, Department {}

export default class DepartmentsRepository {
  static async getDepartments({
    locale,
    collageId = null,
    departmentId = null,
  }: {
    locale: Locale
    collageId?: string | null
    departmentId?: string | null
  }): Promise<GetDepartmentsResult[]> {
    const connection = await DbConnection.getConnection()

    if (locale === undefined) {
      throw new BadRequestError("locale is required")
    }
    
    const department = MAP_LOCALE_TO_DEPARTMENT_NAME[locale]
    
    const [rows] = await connection.query<GetDepartmentsResult[]>(`
      SELECT
        id,
        collageId,
        ${department} as department
      FROM departments
      WHERE id = COALESCE(${departmentId}, id) AND collageId = COALESCE('${collageId}', collageId)
    `)

    return rows
  }
}