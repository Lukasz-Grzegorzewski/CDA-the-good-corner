import {
  BaseEntity,
  Column,
  CreateDateColumn,
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
  @Length(2, 100)
  @Field()
  name!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad], { nullable: true })
  ads!: Ad[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;
}

// Create input fields
@InputType()
export class CategoryCreateInput {
  @Field()
  name!: string;
}

// Update input fields
@InputType()
export class CategoryUpdateInput {
  @Field({ nullable: true })
  name?: string;
}
