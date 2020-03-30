// resolverMap.ts
import { IResolvers } from 'graphql-tools';
import { users, locations, userLocations, LocationData, UserData } from "../dummydata";
const resolverMap: IResolvers = {
  Query: {
    getUsers(_: void, args: void): any {
        return users;
    },
    getLocations(_: void, args: void): any {
        return locations;
    },

    // Eventually move below logic to use sql inner joins 
    getUserMostRecentLocation(parent: any, args: any): LocationData {
        var allUserLocations = userLocations.filter(userLocation => userLocation.user === args.id);
        allUserLocations.sort(function(a,b){
            // Datetime comparator
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
        var locationToFetch = allUserLocations[0].location;

        console.log(locationToFetch);
        return locations.filter(location => location.id == locationToFetch)[0];
    },

    getAllUsersAtLocationInTimeRange(parent: any, args: any): UserData[] {
        const locationId = args.location;
        const startTime = new Date(args.start)
        const endTime = new Date(args.end)

        var filteredUserLocations = userLocations.filter(userLocation => new Date(userLocation.timestamp) >= startTime 
            && new Date(userLocation.timestamp) <= endTime
            && userLocation.location === locationId
        );
        
        const filteredUsers = users.filter(({ id: idv }) => filteredUserLocations.every(({ user: idc }) => idv !== idc));
        return filteredUsers;
    }
  }

};
export default resolverMap;