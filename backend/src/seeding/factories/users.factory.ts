import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { User } from "../../entities/User";

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  //password: 12345678
  user.hashedPassword = "$argon2id$v=19$m=65536,t=3,p=4$71k4dGQ2fYbqPhYOGm9ftA$WtuwMHDyYdLvmYHR5gvvGf2DV2oEsGgaj9B2BMLBIoI";
  user.ads = [];
  user.role = "NONSUBSCRIBED";

  return user;
});
