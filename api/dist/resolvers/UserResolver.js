"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var dummydata_1 = require("../dummydata");
var User_1 = __importDefault(require("../schemas/User"));
var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.userById = function (id) {
        return dummydata_1.users.find(function (user) { return user.id === id; });
    };
    default_1.prototype.userBySIN = function (sin) {
        return dummydata_1.users.find(function (user) { return user.sin === sin; });
    };
    default_1.prototype.getUsers = function () {
        return dummydata_1.users;
    };
    __decorate([
        type_graphql_1.Query(function (returns) { return User_1.default; }, { nullable: true }),
        __param(0, type_graphql_1.Arg("id"))
    ], default_1.prototype, "userById", null);
    __decorate([
        type_graphql_1.Query(function (returns) { return User_1.default; }, { nullable: true }),
        __param(0, type_graphql_1.Arg("sin"))
    ], default_1.prototype, "userBySIN", null);
    __decorate([
        type_graphql_1.Query(function (returns) { return [User_1.default]; })
    ], default_1.prototype, "getUsers", null);
    default_1 = __decorate([
        type_graphql_1.Resolver(function (of) { return User_1.default; })
    ], default_1);
    return default_1;
}());
exports.default = default_1;
