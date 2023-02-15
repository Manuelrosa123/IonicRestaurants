import { User } from "src/app/auth/interfaces/user.interface";

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
}
