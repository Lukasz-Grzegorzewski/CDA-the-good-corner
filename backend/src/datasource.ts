import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database:  __dirname + "/../tgc.sqlite",
  entities: [`${__dirname}/entities/*.ts`],
  synchronize: true,
  logging: true
});