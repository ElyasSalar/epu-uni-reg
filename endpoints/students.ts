import { getCookie } from "../lib/cookie"
import { axiosApiInstance } from "./axios"

import type { GetStudentsParams, GetStudentsApiResponse } from "../types/student"
import type { RegistrationFormData } from "../types/registration"
import type { AxiosRequestConfig, AxiosResponse } from "axios"
import type { WithPagination } from "../types/general"
import type { OkPacket } from "mysql2"

export const registerStudent = async (
  studentData: Partial<RegistrationFormData>
): Promise<AxiosResponse<OkPacket>> => axiosApiInstance.post("/students", studentData)

export const getStudents = async (
  params: GetStudentsParams,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<WithPagination<GetStudentsApiResponse>>> => axiosApiInstance.get("/students", {
  params,
  headers: {
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
  ...config
})

export const deleteStudentById = async (
  id: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosApiInstance.delete("/students", {
  params: { id },
  headers: {
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
  ...config
})