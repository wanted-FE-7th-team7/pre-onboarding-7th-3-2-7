// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await axios.get(
        `http://localhost:4000/${req.url?.split("/").at(-1)}`,
        {
          timeout: 1000,
          headers: { Authorization: `Bearer ${req.cookies.accessToken}` },
        }
      );
      res.status(result.status).json(result.data);
    } catch {
      res.status(404);
    }
  }
}
