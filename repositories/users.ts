import DbConnection from "./connection"
import { BadRequestError } from "../config/apiError"

import type { User } from "../types/user"
import type { OkPacket } from "mysql2"

interface GetUserByUsernameResult extends OkPacket, User {}

export default class UsersRepository {
  static async getUserByUsername({
    username
  }: {
    username: string
  }): Promise<GetUserByUsernameResult[]> {
    const connection = await DbConnection.getConnection()

    if (typeof username !== "string") {
      throw new BadRequestError("username is required")
    }
    
    const [rows] = await connection.query<GetUserByUsernameResult[]>(`
      SELECT * FROM users WHERE username = "${username}"
    `)

    return rows
  }
}