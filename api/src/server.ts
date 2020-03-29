import "reflect-metadata";

import { buildSchema } from "type-graphql";

import { GraphQLServer } from "graphql-yoga";
import UserResolver from "./resolvers/UserResolver";
import LocationResolver from "./resolvers/LocationResolver";

async function start() {
  const schema = await buildSchema({
    resolvers: [UserResolver, LocationResolver],
    emitSchemaFile: true,
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start();
}

start();
