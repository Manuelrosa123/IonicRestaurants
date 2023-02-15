import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user.responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUserMe(): Observable<User> {
    return this.http
    .get<UserResponse>('users/me')
    .pipe(map((r) => r.user));
  }

  editName(name:string, email:string): Observable<User>{
    return this.http.put<User>(`users/me`, ({name,email}));
  }

  editPassword(password:string): Observable<User>{
    return this.http.put<User>(`users/me/password`, ({password}));
  }

  editPhoto(avatar:string): Observable<User>{
    return this.http.put<User>(`users/me/avatar`, ({avatar}));
  }
}
