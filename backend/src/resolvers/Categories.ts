import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from "../entities/Category";
import { validate } from "class-validator";

@Resolver(Category)
export class CategoriesResolver {
  // CATEGORIES
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    const Categorys = await Category.find({ relations: { ads: true } });
    return Categorys;
  }

  // CATEGORY BY ID
  @Query(() => Category)
  async category_Id(@Arg("id", () => ID) id: number): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true },
    });

    return category;
  }

  // CREATE CATEGORY
  @Mutation(() => Category)
  async createCategory(
    @Arg("data") data: CategoryCreateInput
  ): Promise<Category> {
    const newCategory = new Category();

    //add createdAt property
    const date = new Date();
    Object.assign(newCategory, data, { createAd: date });

    const errors = await validate(newCategory);
    if (errors.length === 0) {
      await newCategory.save();
      return newCategory;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  // DELETE CATEGORY
  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg("id", () => ID) id: number
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true },
    });

    if (category) {
      await category.remove();
      category.id = id;
    }

    return category;
  }

  // UPDATE CATEGORY
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("data") data: CategoryUpdateInput
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
    });

    if (category) {
      Object.assign(category, data);
      await category.save();
    }

    return category;
  }
}
