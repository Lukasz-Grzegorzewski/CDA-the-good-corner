import { MiddlewareFn } from "type-graphql";
import { UserContext } from "../types";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { getConnectedUserByCookieToken } from "./getConnectedUserByCookieToken";
import { User } from "../entities/User";

export const isOwnerOrAdmin: MiddlewareFn<UserContext> = async (
  { args, root, context },
  next
) => {
  /* this function is executed on field: "email" in User entity
   * root = return from resolver(Users) -> function user_Id
   */

  const userConnected = await getConnectedUserByCookieToken(
    context.req,
    context.res
  );

  if (
    userConnected?.role === "SUPERADMIN" ||
    userConnected?.role === "ADMIN" ||
    userConnected?.id === root?.id ||
    context.req.body.operationName === "Signin"
  ) {
    return next();
  } else {
    return "";
  }
};
