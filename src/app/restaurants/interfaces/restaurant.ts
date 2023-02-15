import { User } from "src/app/auth/interfaces/user.interface";

export interface Restaurant {
  id?: number;
  name: string;
  image: string;
  cuisine: string;
  description: string;
  phone: string;
  daysOpen: string[];
  address:string,
  lat:number,
  lng:number,
  mine?:boolean;
  creator?:User
}
