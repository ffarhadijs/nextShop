import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { hash } from "bcryptjs";

async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return;
  }
  connectDB();
  const { email, name, password, confirmPassword, isAdmin } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "User existed already" });
  }

  const hashedPassword = await hash(password, 12);
  const hashedConfirmedPassword = await hash(confirmPassword, 12);

  const newUser = await User.create({
    email: email,
    name: name,
    password: hashedPassword,
    confirmPassword: hashedConfirmedPassword,
    isAdmin: isAdmin,
  });
  console.log(newUser);
  res
    .status(201)
    .json({ status: "Success", message: "User created successfully" });
}
export default handler;
