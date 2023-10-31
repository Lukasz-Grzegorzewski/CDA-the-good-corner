import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryInput } from "../entities/Category";
import { validate } from "class-validator";
import { ObjectId } from "../entities/ObjectId";

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async allCategorys(): Promise<Category[]> {
    const Categorys = await Category.find({ relations: { ads: true } });
    return Categorys;
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") { id }: ObjectId): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true },
    });

    return category;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => CategoryInput) data: CategoryInput
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
}
