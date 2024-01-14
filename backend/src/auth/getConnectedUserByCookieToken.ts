import Cookies from "cookies";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

export async function getConnectedUserByCookieToken(
  req: any,
  res: any
): Promise<User | null> {
  const cookies = new Cookies(req, res);

  //get token from cookies
  const token = cookies.get("token");

  if (!token) return null;

  try {
    // extract payload(exp?, userId, iat) from token
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // check if payload has userId
    if (typeof payload === "object" && "userId" in payload) {
      // get user from db
      const user = await User.findOne({
        where: { id: payload.userId },
        relations: { ads: true },
      });

      // check if user exists
      if (user) {
        //deleting hashedPassword from user object
        return Object.assign(user, { hashedPassword: undefined });
      } else {
        console.error("User not found");
        return null;
      }
    } else {
      console.error("Invalid token. Missing userId");
      return null;
    }
  } catch {
    console.error("Invalid token");
    return null;
  }
}
