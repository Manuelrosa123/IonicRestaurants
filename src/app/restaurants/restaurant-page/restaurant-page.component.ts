import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActionSheetController, IonicModule, IonRefresher, NavController } from '@ionic/angular';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  standalone:true,
  imports: [CommonModule, IonicModule, RouterLink,RestaurantCardComponent],
  styleUrls: ['./restaurant-page.component.scss'],
})
export class RestaurantPageComponent implements OnInit {

  restaurants: Restaurant[]=[];
  constructor(
    private restaurantService: RestaurantsService,
    private actionSheetCtrl: ActionSheetController,
    private navController: NavController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.restaurantService
      .getAll()
      .subscribe((rests) => (this.restaurants = rests));
  }

  reloadRestaurants(refresher: IonRefresher) {
    this.restaurantService
    .getAll()
    .subscribe((rests) => {
      this.restaurants = rests;
      refresher.complete();
    });
  }

  async showOptions(rest: Restaurant) {
    const actSheet = await this.actionSheetCtrl.create({
      header: rest.name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.restaurantService
              .delete(rest.id!)
              .subscribe(() =>
                this.restaurants.splice(this.restaurants.indexOf(rest), 1)
              );
          },
        },
        {
          text: 'See details',
          icon: 'eye',
          handler: () => {
            this.navController.navigateForward(['/restaurants', rest.id]);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    actSheet.present();
  }

}
