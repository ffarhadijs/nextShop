import { compare } from "bcryptjs";
import User from "../../../models/User";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }
  const secretKey = process.env.SECRET_KEY;
  const { email, password } = req.body;
  const existuser = await User.findOne({ email });
  if (!existuser) {
    return res
      .status(422)
      .json({ status: "Failed", message: "User doesn't exist" });
  }

  const validPassword = await compare(password, existuser.password);

  if (!validPassword) {
    return res
      .status(422)
      .json({ status: "Failed", message: "Email or password is incorrect" });
  }

  const token = sign({ email }, secretKey!, { expiresIn: 24 * 60 * 60 });

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      serialize("token", token, {
        maxAge: 24 * 60 * 60,
        path: "/",
        httpOnly: false,
      })
    )
    .json({ status: "success", message: "Logged in!", data: { email } });
}

export default handler;
