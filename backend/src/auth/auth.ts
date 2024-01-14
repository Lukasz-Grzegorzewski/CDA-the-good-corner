import { AuthChecker, MiddlewareFn } from "type-graphql";
import { UserContext } from "../types";
import { getConnectedUserByCookieToken } from "./getConnectedUserByCookieToken";

export const customAuthChecker: AuthChecker<UserContext> = async (
  { root, args, context, info },
  roles
) => {
  //get user by token from cookies
  const connectedUser = await getConnectedUserByCookieToken(
    context.req,
    context.res
  );

  if (
    connectedUser &&
    (roles.length === 0 ||
      connectedUser.role === "SUPERADMIN" ||
      connectedUser.role === "ADMIN" ||
      roles.includes(connectedUser.role))
  ) {
    context.user = connectedUser;
    return true;
  } else {
    console.error(
      `Unauthorized ${connectedUser ? " role => " + connectedUser.role : ""}`
    );
    return false;
  }
};
