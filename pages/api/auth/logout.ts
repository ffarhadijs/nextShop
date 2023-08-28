import { serialize } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";
import connectDB from "../../../utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }
  connectDB()
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
