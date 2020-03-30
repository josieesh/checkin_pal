"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var Location = (function () {
    function Location() {
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; })
    ], Location.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Float; })
    ], Location.prototype, "latitude", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Float; })
    ], Location.prototype, "longitude", void 0);
    __decorate([
        type_graphql_1.Field()
    ], Location.prototype, "address", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; })
    ], Location.prototype, "capacity", void 0);
    Location = __decorate([
        type_graphql_1.ObjectType()
    ], Location);
    return Location;
}());
exports.default = Location;
