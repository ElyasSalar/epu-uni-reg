import StudentsRepository from "../repositories/students"
import { ApiError } from "../config/apiError"

import type { NextApiRequest, NextApiResponse } from "next"
import type { RegistrationFormData } from "../types/registration"

export default class StudentsController {
  static async registerStudent(request: NextApiRequest, response: NextApiResponse) {
    const studentDocument: RegistrationFormData = request.body
    
    try {
      const departments = await StudentsRepository.registerStudent(studentDocument)
      
      response.status(201).json(departments)
    } catch (error: ApiError | any) {
      ApiError.handle(error, response)
    }
  }
}