import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { users, UserData } from "../dummydata";
import User from "../schemas/User";

    @Resolver(of => User)
    export default class {
      @Query(returns => User, { nullable: true })
      userById(@Arg("id") id: number): UserData | undefined {
        return users.find(user => user.id === id);
      }

      @Query(returns => User, {nullable: true})
      userBySIN(@Arg("sin") sin: number): UserData | undefined {
          return users.find(user => user.sin === sin);
      }

      @Query(returns => [User])
      getUsers(): UserData[] {
        return users;
      }

    }