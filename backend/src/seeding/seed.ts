import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

import MainSeeder from "./main.seeder";
import { CategoriesFactory } from "./factories/categories.factory";
import { TagsFactory } from "./factories/tags.factory";

import { AdsFactory } from "./factories/ads.factory";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "127.0.0.1",
  port: 5433,
  username: "user",
  password: "pass",
  database: "thegoodcorner",
  entities: [`${__dirname}/factories/*.ts`],
  factories: [CategoriesFactory, TagsFactory, AdsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});

