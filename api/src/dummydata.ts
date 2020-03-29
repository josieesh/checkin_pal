export interface LocationData {
    id: number;
    latitude: number;
    longitude: number;
    address: string;
  }

  export interface UserData {
      id: number;
      firstName: string;
      lastName: string;
      sin: number;
  }


  export const locations: LocationData[] = [
    { id: 1, latitude: -123.456, longitude: 34.565, address: "123 Fake Street"},
    { id: 2, latitude: 123.456, longitude: -34.565, address: "321 Rainbow Road"},
  ];

  export const users: UserData[] = [
    { id: 1, firstName: "John", lastName: "Smith", sin: 123456789},
    { id: 2, firstName: "Jane", lastName: "Doe", sin: 987654321},
    { id: 3, firstName: "John", lastName: "Doe", sin: 321654987},
  ];