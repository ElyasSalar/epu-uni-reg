import DbConnection from "./connection"
import { MAP_LOCALE_TO_COLLAGE_NAME } from "../shared/constants/departments"

import type { Locale } from "../types/locales"
import type { RowDataPacket } from "mysql2"
import type { Collage } from "../types/collage"

interface GetCollagesResult extends RowDataPacket, Collage {}

export default class CollagesRepository {
  static async getCollages({ locale }: { locale: Locale }): Promise<GetCollagesResult[]> {
    const connection = await DbConnection.getConnection()

    const collage = MAP_LOCALE_TO_COLLAGE_NAME[locale]

    const [rows] = await connection.query<GetCollagesResult[]>(`
      SELECT id, ${collage} as collage FROM collages
    `)
    
    return rows
  }
}