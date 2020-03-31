import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import initializeDatabase from './data_access/queries';

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 4000 },
  (): void => {
    //await initializeDatabase(app);
    console.log(`\n🚀      GraphQL is now running on http://localhost:4000/graphql`)
  });

// import "reflect-metadata";

// import { buildSchema } from "type-graphql";

// import { GraphQLServer } from "graphql-yoga";
// import UserResolver from "./resolvers/UserResolver";
// import LocationResolver from "./resolvers/LocationResolver";

// async function start() {
//   const schema = await buildSchema({
//     resolvers: [UserResolver, LocationResolver],
//     emitSchemaFile: true,
//   });

//   const server = new GraphQLServer({
//     schema,
//   });

//   server.start();
// }

// // localhost:4000
// start();
