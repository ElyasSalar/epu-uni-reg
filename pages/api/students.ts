import StudentsController from "../../controller/students"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") StudentsController.registerStudent(request, response)
  if (request.method === "GET") StudentsController.getStudents(request, response)
  if (request.method === "DELETE") StudentsController.deleteStudentById(request, response)
}