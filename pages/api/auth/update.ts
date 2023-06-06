import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../utils/verifyToken";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }
  const { token } = req.cookies;
  const { name, lastName, city, address, postalCode } = req.body;
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

  const user = await User.findOne({ email: result });

  if (!user) {
    return res
      .status(401)
      .json({ status: "failed", message: "User doesn't exist" });
  }
  user.name = name;
  user.lastName = lastName;
  user.city = city;
  user.address = address;
  user.postalCode = postalCode;
  await user.save();
  res.status(201).json({
    status: "success",
    message: user,
  });
}
export default handler;
