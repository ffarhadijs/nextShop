import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import { verifyToken } from "../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }
  const secretKey = process.env.SECRET_KEY;
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const result = verifyToken(token, secretKey!);
  const userData = await User.findOne({ email: result });
  if (result) {
    res.status(200).json({ status: "success", data: userData });
  } else {
    res.status(401).json({ status: "failed", message: "you are unauthorized" });
  }
}
