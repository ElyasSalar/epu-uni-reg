import { getCookie, setCookie } from "./cookie"

export const saveToken = (token: string): void => {
  setCookie("accessToken", token, 7)
}

export const getToken = (): string => getCookie("accessToken")