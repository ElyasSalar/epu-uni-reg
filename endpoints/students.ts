import { axiosApiInstance } from "./axios"

import type { AxiosResponse } from "axios"
import type { OkPacket } from "mysql2"
import { RegistrationFormData } from "../types/registration"

export const registerStudent = async (
  studentData: Partial<RegistrationFormData>
): Promise<AxiosResponse<OkPacket>> => axiosApiInstance.post("/students", studentData)