import { Field, Int, ObjectType, Float } from "type-graphql";

    @ObjectType()
    export default class Location {
        @Field(type => Int)
        id: number;

        @Field(type => Float)
        latitude: number;

        @Field(type => Float)
        longitude: number;

        @Field()
        address: string;

        @Field(type => Int)
        capacity: number;
    }