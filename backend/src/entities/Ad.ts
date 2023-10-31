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
  @Field()
  description!: string;

  @Column({nullable: true, length: 100 })
  @Field()
  owner!: string;

  @Column()
  @IsInt()
  @Field()
  price!: number;

  @Column({ nullable: true })
  @Field()
  imgUrl!: string;

  @Column({ nullable: true, length: 100 })
  @Field()
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads, { onDelete: "CASCADE" })
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

@InputType()
export class AdInput {
  @Field()
  title!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  imgUrl!: string;

  @Field()
  description!: string;

  @Field()
  category!: ObjectId;

  @Field(() => [ObjectId])
  tags!: ObjectId[];
}
