import { axiosApiInstance } from "./axios"

import type { LoginForm } from "../types/login"

export const login = async (loginData: LoginForm) => axiosApiInstance.post("auth/login", loginData)