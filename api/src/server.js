"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });

var http_1 = require("http");
var schema_1 = __importDefault(require("./schema"));

const app = require('./app');
const cookieParser = require('cookie-parser');
const withAuth = require('./auth');


var httpServer = http_1.createServer(app);
httpServer.listen({ port: 4000 }, function () {
    console.log("\n\uD83D\uDE80      App is now running on port 4000");
});
