import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length, Matches } from "class-validator";
import {
  Authorized,
  Field,
  ID,
  InputType,
  ObjectType,
  UseMiddleware,
} from "type-graphql";
import { Ad } from "./Ad";
import { isOwnerOrAdmin } from "../auth/isOwnerOrAdmin";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @UseMiddleware(isOwnerOrAdmin)
  @Column({ length: 255, unique: true })
  @Length(3, 100)
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  @Field()
  email!: string;

  @UseMiddleware(isOwnerOrAdmin)
  @Column({ length: 255 })
  @Length(8, 50)
  @Field()
  role!: "SUPERADMIN" | "ADMIN" | "SUBSCRIBED" | "NONSUBSCRIBED" | "BANNED";

  @Column()
  hashedPassword!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @OneToMany(() => Ad, (ad) => ad.createdBy)
  @Field(() => [Ad])
  ads!: Ad[];
}

// Create input fields
@InputType()
export class SignupInput {
  @Field()
  email!: string;

  @Column()
  @Length(8, 50)
  @Matches(/^.{8,50}$/)
  @Field()
  password!: string;
}
