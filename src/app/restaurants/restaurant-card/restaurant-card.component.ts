import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';
import { RouterLink } from '@angular/router';
import { ActionSheetController, IonicModule, IonRefresher, NavController } from '@ionic/angular';

@Component({
  selector: 'fs-restaurant-card',
  standalone: true,
  imports: [CommonModule, RouterLink,IonicModule],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent {
  @Output() deleted = new EventEmitter<void>();
  @Input() restaurant!: Restaurant;

  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekDay: number = new Date().getDay();

  constructor(private readonly restaurantsService: RestaurantsService) {}

  delete() {
    this.restaurantsService.delete(this.restaurant.id as number).subscribe(
      () => this.deleted.emit()
    );
  }
}
