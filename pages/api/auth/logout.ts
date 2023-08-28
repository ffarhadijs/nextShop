import { serialize } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      serialize("token", "", {
        maxAge: 0,
        path: "/",
        httpOnly: false,
      })
    )
    .json({ status: "success", message: "Logged out!" });
}
