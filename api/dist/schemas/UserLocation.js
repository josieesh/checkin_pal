"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Location_1 = __importDefault(require("./Location"));
var UserLocation = (function () {
    function UserLocation() {
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; })
    ], UserLocation.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return User_1.default; })
    ], UserLocation.prototype, "user", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.CreateDateColumn()
    ], UserLocation.prototype, "timestamp", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Location_1.default; })
    ], UserLocation.prototype, "location", void 0);
    UserLocation = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], UserLocation);
    return UserLocation;
}());
exports.default = UserLocation;
