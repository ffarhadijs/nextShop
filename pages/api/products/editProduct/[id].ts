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

  if (existProduct) {
    existProduct.name = data.name;
    existProduct.image = data.image;
    existProduct.description = data.description;
    existProduct.brand = data.brand;
    existProduct.category = data.category;
    existProduct.price = data.price;
    existProduct.countInStock = data.countInStock;

    await existProduct.save();

    return res.status(201).json({
      status: "success",
      message: "Product updated successfully",
    });
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Product does not exist",
    });
  }
}
