import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Category } from "../../entities/Category";

export const CategoriesFactory = setSeederFactory(Category, (faker: Faker) => {
  const category = new Category();
  category.name = faker.word.noun({ length: { min: 5, max: 15 } })
  return category;
});