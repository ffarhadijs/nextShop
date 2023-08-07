import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../utils/connectDB";
import { verifyToken } from "../../../../utils/verifyToken";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
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

  const deleteUser = await User.deleteOne({ _id: id });
  console.log(deleteUser,"deleteUser");
  if (deleteUser.deletedCount === 1) {
    return res.status(201).json({
      status: "success",
      message: "User deleted successfully",
    });
  } else {
    return res.status(401).json({
      status: "failed",
      message: "User does not deleted",
    });
  }
}
