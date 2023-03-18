import DepartmentsRepository from "../repositories/departments"

import type { NextApiRequest, NextApiResponse } from "next"
import type { Locale } from "../types/locales"
import type { Department } from "../types/departments"
import { ApiError } from "../config/apiError"

export default class DepartmentsController {
  static async getDepartments(request: NextApiRequest, response: NextApiResponse<Department[]>) {
    const { locale, collageCode, departmentId } = request.query

    try {
      const departments = await DepartmentsRepository.getDepartments({
        departmentId: departmentId as string,
        collageCode: collageCode as string,
        locale: locale as Locale,
      })
      
      response.status(200).json(departments)
    } catch (error: ApiError | any) {
      ApiError.handle(error, response)
    }
  }
}