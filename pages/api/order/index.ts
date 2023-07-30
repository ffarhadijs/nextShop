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
  const payload = JSON.parse(data);

  if (!result) {
    return res
      .status(401)
      .json({ status: "failed", messgae: "you are unauthorized" });
  }

  const user = await User.findOne({ email: result });

  const newOrder = await Order.create({
    orderItems: payload.orderItems,
    shippingAddress: payload.shippingAddress,
    itemsPrice: payload.itemsPrice,
    shippingPrice: payload.shippingPrice,
    taxPrice: payload.taxPrice,
    totalPrice: payload.totalPrice,
    user: user._id,
  });

  res.status(201).json({
    status: "Success",
    message: "Order added successfully",
  });

}
