import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Ad } from "../../entities/Ad";

export const AdsFactory = setSeederFactory(Ad, (faker: Faker) => {
  const ad = new Ad();
  const title = faker.word.noun({ length: { min: 5, max: 15 } });
  ad.title = title.charAt(0).toUpperCase() + title.slice(1);
  ad.description = faker.lorem.sentence({ min: 3, max: 5 });
  ad.owner = faker.internet.email();
  ad.price = faker.number.int({ min: 0, max: 1000 });
  ad.imgUrl = faker.image.urlLoremFlickr({width:200, height: 150, category: 'cats'})
  ad.location = faker.location.city();
  return ad;
});
