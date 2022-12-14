// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getPage = (url: string | undefined) => {
  return url?.split("=")[1] ?? "1";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log(
        `http://localhost:4000/${req.url
          ?.split("/")
          .at(-1)
          ?.replace("page", "_page")}&_limit=20`
      );
      const result = await axios.get(
        `http://localhost:4000/${req.url
          ?.split("/")
          .at(-1)
          ?.replace("page", "_page")}&_limit=20`,
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
