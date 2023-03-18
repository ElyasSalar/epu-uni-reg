import DocumentsRepository from "../repositories/documents"
import { ApiError } from "../config/apiError"

import type { NextApiRequest, NextApiResponse } from "next"
import type { StudentDocument } from "../types/document"

export default class DocumentsController {
  static async addDocument(request: NextApiRequest, response: NextApiResponse) {
    const studentDocument: StudentDocument = request.body

    try {
      const departments = await DocumentsRepository.addDocument(studentDocument)
      
      response.status(201).json(departments)
    } catch (error: ApiError | any) {
      ApiError.handle(error, response)
    }
  }

  static async deleteDocument(request: NextApiRequest, response: NextApiResponse) {
    const { file_id }: { file_id?: string } = request.query

    try {
      const departments = await DocumentsRepository.deleteDocumentById(file_id)
      
      response.status(204).json(departments)
    } catch (error: ApiError | any) {
      ApiError.handle(error, response)
    }
  }
}