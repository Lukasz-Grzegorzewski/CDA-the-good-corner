import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length, Min, Max } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Length(10, 100, {
    message: "Entre 10 et 100 caractères"
  })
  @Column({ length: 100 })
  name!: string;

  @OneToMany(() => Ad, ad => ad.category)
  ads!: Ad[];

}
