"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dummydata_1 = require("../dummydata");
var resolverMap = {
    Query: {
        getUsers: function (_, args) {
            return dummydata_1.users;
        },
        getLocations: function (_, args) {
            return dummydata_1.locations;
        },
        getUserMostRecentLocation: function (parent, args) {
            var allUserLocations = dummydata_1.userLocations.filter(function (userLocation) { return userLocation.user === args.id; });
            allUserLocations.sort(function (a, b) {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            });
            var locationToFetch = allUserLocations[0].location;
            console.log(locationToFetch);
            return dummydata_1.locations.filter(function (location) { return location.id == locationToFetch; })[0];
        },
        getAllUsersAtLocationInTimeRange: function (parent, args) {
            var locationId = args.location;
            var startTime = new Date(args.start);
            var endTime = new Date(args.end);
            var filteredUserLocations = dummydata_1.userLocations.filter(function (userLocation) { return new Date(userLocation.timestamp) >= startTime
                && new Date(userLocation.timestamp) <= endTime
                && userLocation.location === locationId; });
            var filteredUsers = dummydata_1.users.filter(function (_a) {
                var idv = _a.id;
                return filteredUserLocations.every(function (_a) {
                    var idc = _a.user;
                    return idv !== idc;
                });
            });
            return filteredUsers;
        }
    }
};
exports.default = resolverMap;
