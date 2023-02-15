export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  me?:boolean;
  lat:number;
  lng:number;
}
