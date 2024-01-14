import "reflect-metadata";
import { dataSource } from "./datasource";
import { buildSchema } from "type-graphql";
import { TagsResolver } from "./resolvers/Tags";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdsResolver } from "./resolvers/Ads";
import { CategoriesResolver } from "./resolvers/Categories";
import { UsersResolver } from "./resolvers/Users";
import { customAuthChecker } from "./auth/auth";

(async function start() {

  const schema = await buildSchema({
    resolvers: [AdsResolver, TagsResolver, CategoriesResolver, UsersResolver],
    authChecker: customAuthChecker, // startStandaloneServer(... context: async ({req,res})...) => //// authChecker //// => Resolver. - middleware that execute between passing context to resolver and execution of resolver
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req, res }) => ({ req, res }),
  });
  console.log("🚀 Server started!");
})()

/*
app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["https://localhost:3010"],
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server)
);
*/
