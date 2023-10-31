import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(10, 100)
  @Field()
  name!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad], { nullable: true })
  ads!: Ad[];
}

@InputType()
export class CategoryInput {
  @Field()
  name!: string;

  @Field(() => [ObjectId])
  ads!: ObjectId[];
}
