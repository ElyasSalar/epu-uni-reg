import { axiosApiInstance } from "./axios"

import type { AxiosResponse } from "axios"
import type { OkPacket } from "mysql2"

export const addDocument = async (studentDocument: {
  message_id: number
  file_name?: string
  file_size?: number
  mime_type?: string
  file_id: string
}): Promise<AxiosResponse<OkPacket>> => axiosApiInstance.post("/documents", studentDocument)

export const deleteDocumentById = async (
  documentId: string
): Promise<AxiosResponse<OkPacket>> => axiosApiInstance.delete("/documents", {
  params: {
    file_id: documentId
  }
})