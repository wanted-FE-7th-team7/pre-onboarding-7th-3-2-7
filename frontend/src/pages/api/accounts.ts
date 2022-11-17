// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  accessToken: string;
};

const getPage = (url: string | undefined) => {
  return url?.split("=")[1] ?? "1";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const result = await axios.get(
        `http://localhost:4000/accounts?_page=${getPage(req.url)}&_limit=20`,
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
