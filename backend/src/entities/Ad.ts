import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length, ValidateIf, IsInt } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Length(5, 100, {
    message: "Entre 10 et 100 caractères",
  })
  @Column({ length: 100 })
  @Field()
  title!: string;

  @Column({ nullable: true, length: 100 })
  @ValidateIf((object, value) => !!value)
  @Field({ nullable: true })
  description!: string;

  @Column({ nullable: true, length: 100 })
  @Field()
  owner!: string;

  @Column()
  @IsInt()
  @Field()
  price!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imgUrl!: string;

  @Column({ nullable: true, length: 100 })
  @Field({ nullable: true })
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads, {
    onDelete: "CASCADE",
  })
  @Field(() => Category, { nullable: true })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { onDelete: "CASCADE" })
  @JoinTable()
  @Field(() => [Tag], { nullable: true })
  tags!: Tag[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;
}

// FILTERS
@InputType()
export class AdsWhere {
  @Field(() => [ID], { nullable: true })
  categoryId?: number[];

  @Field(() => String, { nullable: true })
  searchTitle?: string;

  // @Field(() => Int, { nullable: true })
  // priceGte?: number;

  // @Field(() => Int, { nullable: true })
  // priceLte?: number;
}

// Create input fields
@InputType()
export class AdCreateInput {
  @Field()
  title!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  owner!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imgurl?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  category?: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags?: ObjectId[];

  @Field()
  createdAt?: Date;
}

// Update input fields
@InputType()
export class AdUpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imgurl?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  category?: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags?: ObjectId[];
}
