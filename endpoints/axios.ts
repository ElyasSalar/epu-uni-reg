import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL

export const axiosApiInstance = axios.create({
  baseURL: `http://${BASE_URL}/api/`,
})