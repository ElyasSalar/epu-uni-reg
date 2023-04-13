import axios from "axios"

export const axiosApiInstance = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/`,
})