"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });

var apollo_server_express_1 = require("apollo-server-express");
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var http_1 = require("http");

var schema_1 = __importDefault(require("./schema"));

const app = require('./app');






var server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    validationRules: [graphql_depth_limit_1.default(7)],
});

server.applyMiddleware({ app: app, path: '/graphql' });
var httpServer = http_1.createServer(app);
httpServer.listen({ port: 4000 }, function () {
    console.log("\n\uD83D\uDE80      GraphQL is now running on http://localhost:4000/graphql");
});
