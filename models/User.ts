import mongoose from "mongoose";
import { UserType } from "../types/user.type";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);

export default User;
