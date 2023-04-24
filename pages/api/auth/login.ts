import { NextApiRequest, NextApiResponse } from "next"
import AuthController from "../../../controller/auth"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") AuthController.login(request, response)
}