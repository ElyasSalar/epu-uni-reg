import { axiosApiInstance } from "./axios"

import type { Department } from "../types/departments"
import type { AxiosResponse } from "axios"

type GetDepartmentsParams = {
  locale: string
  collageId?: string
  departmentId?: string
}

export const getDepartments = async (
  params: GetDepartmentsParams
): Promise<AxiosResponse<Department[]>> => axiosApiInstance.get("departments", { params })