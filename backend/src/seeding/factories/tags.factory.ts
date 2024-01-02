import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Tag } from "../../entities/Tag";

export const TagsFactory = setSeederFactory(Tag, (faker: Faker) => {
  const tag = new Tag();
  tag.name = faker.word.adjective({ length: { min: 5, max: 15 } })
  return tag;
});