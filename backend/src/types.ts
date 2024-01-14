import { User } from "./entities/User";

export type UserContext = {
  req: any;
  res: any;
  user?: User;
};