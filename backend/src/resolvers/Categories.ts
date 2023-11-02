import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from "../entities/Category";
import { validate } from "class-validator";
import { ObjectId } from "../entities/ObjectId";

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
  async category_Id(@Arg("id") { id }: ObjectId): Promise<Category | null> {
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
    Object.assign(newCategory, data);

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
    @Arg("id", () => Int) id: number
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true }
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
    @Arg("id", () => Int) id: number,
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
