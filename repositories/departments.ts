import DbConnection from "./connection"
import { BadRequestError } from "../config/apiError"
import { MAP_LOCALE_TO_COLLAGE_NAME, MAP_LOCALE_TO_DEPARTMENT_NAME } from "../shared/constants/departments"

import type { Department } from "../types/departments"
import type { Locale } from "../types/locales"
import type { RowDataPacket } from "mysql2"

interface GetDepartmentsResult extends RowDataPacket, Department {}

export default class DepartmentsRepository {
  static async getDepartments({
    locale,
    collageCode = null,
    departmentId = null,
  }: {
    locale: Locale
    collageCode?: string | null
    departmentId?: string | null
  }): Promise<GetDepartmentsResult[]> {
    const connection = await DbConnection.getConnection()

    if (locale === undefined) {
      throw new BadRequestError("locale is required")
    }
    
    const department = MAP_LOCALE_TO_DEPARTMENT_NAME[locale]
    const collage = MAP_LOCALE_TO_COLLAGE_NAME[locale]
    
    const [rows] = await connection.query<GetDepartmentsResult[]>(`
      SELECT
        id,
        code,
        collageCode,
        ${collage} as collage,
        ${department} as department
      FROM departments
      WHERE id = COALESCE(${departmentId}, id) AND collageCode = COALESCE('${collageCode}', collageCode)
    `)

    return rows
  }

  static async getCollages({ locale }: { locale: Locale }): Promise<GetDepartmentsResult[]> {
    const connection = await DbConnection.getConnection()

    const department = MAP_LOCALE_TO_DEPARTMENT_NAME[locale]
    const collage = MAP_LOCALE_TO_COLLAGE_NAME[locale]

    const [rows] = await connection.query<GetDepartmentsResult[]>(`
      SELECT
        MAX(id),
        code,
        collageCode,
        ${collage} as collage,
        ${department} as department
      FROM departments
      GROUP BY collageCode
    `)
    
    return rows
  }
}