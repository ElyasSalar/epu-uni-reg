import DepartmentsRepository from "../repositories/departments"

import type { NextApiRequest, NextApiResponse } from "next"
import type { Locale } from "../types/locales"
import type { Department } from "../types/departments"
import { ApiError } from "../config/apiError"

export default class DepartmentsController {
  static async getDepartments(request: NextApiRequest, response: NextApiResponse<Department[]>) {
    const { locale, collageId, departmentId } = request.query

    try {
      const departments = await DepartmentsRepository.getDepartments({
        departmentId: departmentId as string,
        collageId: collageId as string,
        locale: locale as Locale,
      })
      
      response.status(200).json(departments)
    } catch (error: ApiError | any) {
      ApiError.handle(error, response)
    }
  }
}