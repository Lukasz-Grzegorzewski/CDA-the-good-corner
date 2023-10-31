import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Length(5, 100, {
    message: "Entre 10 et 100 caractères",
  })
  @Column({ length: 100 })
  title!: string;

  @Column({ nullable: true, length: 100 })
  description!: string;

  @Column({nullable: true, length: 100 })
  owner!: string;

  @Column()
  price!: number;

  @Column({ nullable: true, length: 100 })
  imgUrl!: string;

  @Column({ nullable: true, length: 100 })
  location!: string;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads, {
    onDelete: "CASCADE",
  })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { onDelete: "CASCADE" })
  @JoinTable()
  tags!: Tag[];
}
