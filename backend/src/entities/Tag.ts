import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100)
  @Field()
  name!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad], { nullable: true })
  ads!: Ad[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;
}

// Create input fields
@InputType()
export class TagCreateInput {
  @Field()
  name!: string;

  @Field()
  createdAt?: Date;
}

// Update input fields
@InputType()
export class TagUpdateInput {
  @Field({ nullable: true})
  name?: string;
}
