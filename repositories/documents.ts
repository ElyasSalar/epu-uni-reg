import DbConnection from "./connection"

import { StudentDocument } from "../types/document"
import type { OkPacket } from "mysql2"
import { NotFoundError } from "../config/apiError"

export default class DocumentsRepository {
  static async addDocument(studentDocument: StudentDocument) {
    const connection = await DbConnection.getConnection()

    const { file_id, message_id, file_size, mime_type, file_name } = studentDocument
    
    const [response] = await connection.query(
      "INSERT INTO documents VALUES(?, ?, ?, ?, ?)",
      [file_id, message_id, file_name, mime_type, file_size]
    )

    return response
  }

  static async deleteDocumentById(documentId?: string) {
    const connection = await DbConnection.getConnection()
    
    const [response] = await connection.query<OkPacket>(
      "DELETE FROM documents WHERE file_id = ?",
      [documentId]
    )
    
    if (response.affectedRows === 0) {
      throw new NotFoundError()
    }

    return response
  }
}