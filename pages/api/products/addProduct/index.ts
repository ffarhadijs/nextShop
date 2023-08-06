import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../models/Product";
import connectDB from "../../../../utils/connectDB";
import { verifyToken } from "../../../../utils/verifyToken";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  connectDB();

  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const data = req.body;

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

  const existProduct = await Product.findOne({ slug: data.slug });

  if (existProduct) {
    return res.status(401).json({
      status: "failed",
      message: "Product name is also exist, please choose another name",
    });
  } else {
    const product = new Product(data);
    await product.save();
    return res.status(201).json({
      status: "success",
      message: "New product added successfully",
    });
  }
}
