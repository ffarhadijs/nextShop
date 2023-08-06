import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../models/Product";
import connectDB from "../../../../utils/connectDB";
import { verifyToken } from "../../../../utils/verifyToken";
import { env } from "process";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }

  connectDB();

  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const { id } = req.query;

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

  const user = await User.findOne({ email: result });

  if (!user) {
    return res
      .status(401)
      .json({ status: "failed", message: "User doesn't exist" });
  }

  const existProduct = await Product.findOne({ _id: id });

  if (!existProduct) {
    return res.status(401).json({
      status: "failed",
      message: "Product doesnt exist!",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: existProduct,
    });
  }
}
