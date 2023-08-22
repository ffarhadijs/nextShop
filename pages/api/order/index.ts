import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Order from "../../../models/Order";
import { verifyToken } from "../../../utils/verifyToken";
import User from "../../../models/User";

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
  const result = verifyToken(token!, secretKey!);
  const data = req.body;

  if (!result) {
    return res
      .status(401)
      .json({ status: "failed", message: "you are unauthorized" });
  }

  if (
    !data.shippingAddress.country ||
    !data.shippingAddress.city ||
    !data.shippingAddress.address ||
    !data.shippingAddress.lastName ||
    !data.shippingAddress.postalCode
  ) {
    return res
      .status(422)
      .json({
        status: "failed",
        message: "You should complete your shipping address",
      });
  }
  const user = await User.findOne({ email: result });

  const newOrder = await Order.create({
    orderItems: data.orderItems,
    shippingAddress: data.shippingAddress,
    itemsPrice: data.itemsPrice,
    shippingPrice: data.shippingPrice,
    taxPrice: data.taxPrice,
    totalPrice: data.totalPrice,
    user: user._id,
  });

  res.status(201).json({
    status: "Success",
    message: "Order added successfully",
  });
}
