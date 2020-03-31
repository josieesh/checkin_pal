"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var http_1 = require("http");
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var schema_1 = __importDefault(require("./schema"));
var session = require('express-session');
var ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
var app = express_1.default();
var server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    validationRules: [graphql_depth_limit_1.default(7)],
});
var oidc = new ExpressOIDC({
    issuer: process.env.ISSUER,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: 'http://localhost:4000/authorization-code/callback',
    scope: 'openid profile'
});

console.log("HERE!!!!!");
app.use('*', cors_1.default());
app.use(compression_1.default());
app.use(session({
    secret: 'this should be secure',
    resave: false,
    saveUninitialized: false
}));

console.log("HERE2!!!!!");
app.use(oidc.router);

// app.get('/graphql', oidc.ensureAuthenticated(), (req, res) => {
//     console.log(req);
//     res.send(JSON.stringify(req.userContext.userinfo));
//   });

// app.get('/graphql', oidc.ensureAuthenticated(), (req, res) => {
//     console.log(req);
//     console.log(res);
//     //res.send(req.session.passport);
// });

app.all('*', oidc.ensureAuthenticated(
    {redirect_uri: '/login'}
), (req, res) => {
    console.log(req);
});

server.applyMiddleware({ app: app, path: '/graphql' });
var httpServer = http_1.createServer(app);
httpServer.listen({ port: 4000 }, function () {
    console.log("\n\uD83D\uDE80      GraphQL is now running on http://localhost:4000/graphql");
});
