import { Secret, verify } from "jsonwebtoken";

export const verifyToken = (token: string, secretKey: Secret) => {
  try {
    const { email } = verify(token, secretKey!) as any;
    return email;
  } catch {
    return false;
  }
};
