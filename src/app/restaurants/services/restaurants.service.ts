import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  RestaurantResponse,
  RestaurantsResponse,
} from '../interfaces/responses';
import { Restaurant } from '../interfaces/restaurant';
import { Comment } from '../interfaces/comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private readonly BASE_URL= "restaurants";
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http
      .get<RestaurantsResponse>('restaurants')
      .pipe(map((r) => r.restaurants));
  }

  getById(id: number): Observable<Restaurant> {
    return this.http
      .get<RestaurantResponse>(`restaurants/${id}`)
      .pipe(map((r) => r.restaurant));
  }

  create(restaurant: Restaurant): Observable<Restaurant> {
    return this.http
      .post<RestaurantResponse>('restaurants', restaurant)
      .pipe(map((r) => r.restaurant));
  }

  delete(id: number): Observable<void> {
    console.log(id);
    return this.http.delete<void>(`restaurants/${id}`).pipe();
  }

  // comments ->

  addComment(idProd: number, comment: string): Observable<Comment> {
    return this.http
      .post<{ comment: Comment }>(`${this.BASE_URL}/${idProd}/comments`, {
        text: comment,
      })
      .pipe(
        map((resp) => {
          resp.comment.user!.avatar =
            environment.baseUrl + '/' + resp.comment.user!.avatar;
          return resp.comment;
        })
      );
  }

  getComments(idProd: number): Observable<Comment[]> {
    return this.http
      .get<{ comments: Comment[] }>(`${this.BASE_URL}/${idProd}/comments`)
      .pipe(
        map((resp) =>
          resp.comments.map((c) => {
            c.user!.avatar = environment.baseUrl + '/' + c.user!.avatar;
            return c;
          })
        )
      );
  }

}
