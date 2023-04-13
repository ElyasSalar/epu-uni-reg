import axios from "axios"
import { BASE_URL } from "../shared/constants/routes"

export const axiosApiInstance = axios.create({
  baseURL: `${BASE_URL}/api/`,
})