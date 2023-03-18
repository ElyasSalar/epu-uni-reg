import axios from "axios"

import type { StudentDocument } from "../types/document"
import type { AxiosResponse, AxiosRequestConfig } from "axios"
import type { ApiSuccess, File as TypegramFile, Message } from "typegram"

export default class TelegramApi {
  private static botToken: string = process.env.TELEGRAM_BOT_TOKEN || ""
  private static chatId: string = process.env.TELEGRAM_BOT_CHAT_ID || ""
  private static baseUrl = `https://api.telegram.org/bot${this.botToken}`

  private static axiosInstance = axios.create({
    baseURL: this.baseUrl,
  })

  public static async sendDocument(document: File, config?: AxiosRequestConfig): Promise<StudentDocument> {
    const formData = new FormData()
    formData.set("chat_id", this.chatId)
    formData.set("document", document)

    const response = await this.axiosInstance.post<ApiSuccess<Message.DocumentMessage>>("/sendDocument", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    })
    return {
      ...response.data.result.document,
      message_id: response.data.result.message_id,
    }
  }

  public static async getFile(fileId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TypegramFile>> {
    const params = new URLSearchParams()
    params.append("file_id", fileId)

    const response = await this.axiosInstance.get<TypegramFile>(`/getFile?${params}`, config)
    return response
  }

  public static async deleteMessage(messageId: number, config?: AxiosRequestConfig): Promise<void> {
    const params = new URLSearchParams()
    params.append("chat_id", this.chatId)
    params.append("message_id", String(messageId))

    await this.axiosInstance.post(`/deleteMessage?${params}`, config)
  }
}