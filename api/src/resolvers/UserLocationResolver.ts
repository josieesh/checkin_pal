// import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
// import { userLocations, UserLocationData } from "../dummydata";
// import UserLocation from "../schemas/UserLocation";
// import LocationResolver from "./LocationResolver";

//     @Resolver(of => UserLocation)
//     export default class {
//       @Query(returns => Location, { nullable: true })
//       UserLocationAtTimestamp(@Arg("id") id: number, @Arg("timestamp") timestamp: Date): LocationData | undefined {
//         return locations.find(location => location.id === id);
//       }
//     }