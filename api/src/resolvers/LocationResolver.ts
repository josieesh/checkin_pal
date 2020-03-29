import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { locations, LocationData } from "../dummydata";
import Location from "../schemas/Location";

    @Resolver(of => Location)
    export default class {
      @Query(returns => Location, { nullable: true })
      locationById(@Arg("id") id: number): LocationData | undefined {
        return locations.find(location => location.id === id);
      }
    }