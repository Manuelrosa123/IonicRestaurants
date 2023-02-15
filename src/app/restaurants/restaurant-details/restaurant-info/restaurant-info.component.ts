import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantsService } from '../../services/restaurants.service';
import { RestaurantDetailsComponent } from '../restaurant-details.component';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class RestaurantInfoComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(
    private alertCrl: AlertController,
    private restaurantsService: RestaurantsService,
    private nav: NavController,
    @Inject(RestaurantDetailsComponent) private parentComponent: RestaurantDetailsComponent
  ) {}

  ngOnInit() {
    this.parentComponent.restaurant$.subscribe(
      ( restaurant: Restaurant) => this.restaurant = restaurant
    );
  }

  async delete() {
    const alert = await this.alertCrl.create({
      header: 'Delete restaurant',
      message: 'Are you sure you want to delete this restaurant?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.restaurantsService
              .delete(this.restaurant.id!)
              .subscribe(() => this.nav.navigateBack(['/restaurants']));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

}
