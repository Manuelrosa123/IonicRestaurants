import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable, shareReplay } from 'rxjs';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant!: Restaurant;
  restaurant$!: Observable<Restaurant>;

  constructor(
    public environmentInjector: EnvironmentInjector,
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {
    this.restaurant$ = this.restaurantsService
      .getById(this.route.snapshot.params['id'])
      .pipe(shareReplay(1)); // There can be multiple suscriptions to this observable
  }

  ngOnInit() {
    this.restaurant$.subscribe((restaurant) => (this.restaurant = restaurant));
  }

  getRestaurant(): Observable<Restaurant> {
    return this.restaurant$;
  }

}
