import type { Document } from "typegram"

export type StudentDocument = Document & {
  message_id: number
}