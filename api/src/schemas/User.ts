import { Field, Int, ObjectType } from "type-graphql";

    @ObjectType()
    export default class User {
      @Field(type => Int)
      id: number;

      @Field()
      firstName: string;

      @Field()
      lastName: string;

      @Field(type => Int)
      sin: number;
    }