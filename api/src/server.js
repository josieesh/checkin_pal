"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });
const bodyParser = require('body-parser');

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

app.use('*', cors_1.default());
app.use(compression_1.default());
app.use(session({
    secret: 'this should be secure',
    resave: false,
    saveUninitialized: false
}));
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(oidc.router);

// app.all('*', oidc.ensureAuthenticated(
//     {redirect_uri: '/login'}
// ), (req, res) => {
//     console.log(req);
// });


// Import our User schema
const User = require("../data_access/models")["user"];
const Sequelize = require("sequelize");

// POST route to register a user
app.post('/register', function(req, res) {
  const { username, password, first_name, last_name, sin } = req.body;
  const user = User.create({ 
      first_name: first_name, 
      last_name: last_name,
      username: username, 
      password: password,
      sin: sin
    }).then(function(item){
        res.json({
          "New user" : {
              "First name": first_name,
              "Last name": last_name,
              "Username": username,
              "SIN": sin
          }
        });
      }).catch(function (err) {
        if (err instanceof Sequelize.UniqueConstraintError) {
            res.status(500).send(err.errors[0].message);
          }
        else{
            res.status(500)
            .send("Error registering new user please try again.");
        }
        
      });

    // sequelize.sync().then(function () {
    //     return feed.create({
    //         subscriber_id: 5008,
    //         activity_id : 116
    //     });
    // }).then(function (jane) {
    //     res.sendStatus(jane);
    // });
});



server.applyMiddleware({ app: app, path: '/graphql' });
var httpServer = http_1.createServer(app);
httpServer.listen({ port: 4000 }, function () {
    console.log("\n\uD83D\uDE80      GraphQL is now running on http://localhost:4000/graphql");
});
