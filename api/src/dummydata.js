"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locations = [
    { id: 1, latitude: -123.456, longitude: 34.565, address: "123 Fake Street" },
    { id: 2, latitude: 123.456, longitude: -34.565, address: "321 Rainbow Road" },
];
exports.users = [
    { id: 1, firstName: "John", lastName: "Smith", sin: 123456789 },
    { id: 2, firstName: "Jane", lastName: "Doe", sin: 987654321 },
    { id: 3, firstName: "John", lastName: "Doe", sin: 321654987 },
];
exports.userLocations = [
    { id: 1, user: 1, location: 1, timestamp: "01/12/2020 00:00:00" },
    { id: 2, user: 1, location: 1, timestamp: "01/12/2020 12:00:00" },
    { id: 2, user: 1, location: 2, timestamp: "03/24/2020 12:00:00" },
    { id: 3, user: 2, location: 2, timestamp: "04/12/2020 08:54:00" },
    { id: 4, user: 3, location: 2, timestamp: "1/24/1990 09:00:00" },
];
