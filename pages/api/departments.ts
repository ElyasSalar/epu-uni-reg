import DepartmentsController from "../../controller/departments"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") DepartmentsController.getDepartments(request, response)
}