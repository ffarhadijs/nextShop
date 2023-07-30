import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Order from "../../../models/Order";
import { verifyToken } from "../../../utils/verifyToken";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;

  connectDB();

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }
  const result = verifyToken(token, secretKey!);
  if (!result) {
    return res
      .status(401)
      .json({ status: "failed", messgae: "you are unauthorized" });
  }

  const orders = await Order.find({});

  res.status(200).json({ status: "success", data: orders });
}
