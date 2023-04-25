import AuthController from "./auth"
import { BadRequestError } from "../config/apiError"
import StudentsRepository from "../repositories/students"
import { ApiError, AuthFailureError } from "../config/apiError"

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

  static async getStudents(request: NextApiRequest, response: NextApiResponse) {
    const user = await AuthController.isAuthenticated(request)

    if (user === null) {
      return ApiError.handle(new AuthFailureError(), response)
    }

    const { page = 0, size = 15, searchQuery = "" } = request.query
    
    try {
      const students = await StudentsRepository.getStudents({
        searchQuery: String(searchQuery),
        offset: Number(page),
        limit: Number(size),
      })

      return response.status(200).json(students)
    } catch (error: ApiError | any) {
      return ApiError.handle(error, response)
    }
  }

  static async deleteStudentById(request: NextApiRequest, response: NextApiResponse) {
    const user = await AuthController.isAuthenticated(request)

    if (user === null) {
      return ApiError.handle(new AuthFailureError(), response)
    }

    const { id } = request.query

    if (typeof id !== "string") {
      return ApiError.handle(new BadRequestError(), response)
    }
    
    try {
      await StudentsRepository.deleteStudentById({ id })

      return response.status(200).json({})
    } catch (error: ApiError | any) {
      return ApiError.handle(error, response)
    }
  }
}
