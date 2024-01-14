import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { SignupInput, User } from "../entities/User";
import argon2 from "argon2";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { UserContext } from "../types";

@Resolver(User)
export class UsersResolver {
  // Users
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.find({});
    return users;
  }

  // User BY ID
  @Query(() => User)
  async user_Id(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await User.findOne({
      where: { id },
      relations: { ads: true },
    });
    if (user) return Object.assign(user);
    else return null;
  }

  // User BY JWT
  @Authorized()
  @Query(() => User)
  async me(@Ctx() context: UserContext): Promise<User> {
    return context.user as User;
  }

  // CREATE User
  @Mutation(() => User)
  async signup(@Arg("data") data: SignupInput): Promise<User> {
    //Validate password given by client (by class SignupInput)
    const errorsInput = await validate(data);
    if (errorsInput.length > 0) {
      throw new Error(`Error occured: ${JSON.stringify(errorsInput)}`);
    }

    //Validate uniqness of email
    const userExists = await User.findOneBy({ email: data.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    //hash password
    const hashedPassword = await argon2.hash(data.password);

    //Create new user
    const newUser = new User();
    const date = new Date();
    Object.assign(newUser, {
      email: data.email,
      hashedPassword,
      createdAt: date,
    });

    //validation of new user (by class User)
    const errors = await validate(newUser);
    if (errors.length === 0) {
      await newUser.save();
      return newUser;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: UserContext
  ): Promise<User | null> {
    const user = await User.findOneBy({ email });

    if (!user) throw new Error("User not found");

    const passwordVerified = await argon2.verify(user.hashedPassword, password);

    if (!passwordVerified) return null;

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
        userId: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET!
    );
  
    const cookies = new Cookies(context.req, context.res);

    cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return user;
  }
}
