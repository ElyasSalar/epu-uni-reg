import jwt from "jsonwebtoken"
import UsersRepository from "../repositories/users"
import { ApiError, AuthFailureError, BadRequestError, NoEntryError } from "../config/apiError"

import type { NextApiRequest, NextApiResponse } from "next"
import type { User } from "../types/user"

export default class AuthController {
  static async login(request: NextApiRequest, response: NextApiResponse) {
    const { username, password } = request.body

    if (username === undefined || password === undefined) {
      return ApiError.handle(new BadRequestError("locale is required"), response)
    }

    let user: User | undefined
    try {
      const users = await UsersRepository.getUserByUsername({ username })
      
      if (users.length === 0) {
        return ApiError.handle(new NoEntryError("username doesn't exist"), response)
      }

      user = users[0]
    } catch (error: ApiError | any) {
      return ApiError.handle(error, response)
    }


    if (user.password !== password) {
      return ApiError.handle(new AuthFailureError(), response)
    }

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "7 days"
    })

    response.status(200).json({ token })
  }

  static async isAuthenticated(request: NextApiRequest): Promise<User | null> {
    const { authorization } = request.headers

    if (authorization === undefined) {
      return null
    }

    const token = authorization.split(" ")[1]

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as User
      
      return user
    } catch (error) {
      return null
    }
  }
}