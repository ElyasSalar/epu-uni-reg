import DocumentsController from "../../controller/documents"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") DocumentsController.addDocument(request, response)
  if (request.method === "DELETE") DocumentsController.deleteDocument(request, response)
}