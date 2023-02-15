import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.scss'],
  standalone:true,
  imports: [CommonModule, IonicModule, RouterLink, FormsModule]
})
export class NewRestaurantComponent implements OnInit {

  daysOpen: boolean[] = new Array(7).fill(true);
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  newRes: Restaurant = {
    name: '',
    image: '',
    cuisine: '',
    description: '',
    phone: '',
    daysOpen: [],
    address: '',
    lat:0,
    lng:0
  };

  constructor(
    private restaurantService: RestaurantsService,
    private toastCtrl: ToastController,
    private nav: NavController
  ) { }

  ngOnInit() {
  }

  addRestaurant() {
    this.restaurantService.create(this.newRes).subscribe(
      async res => {
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Restaurant added succesfully',
          color: 'success'
        })).present();
        this.nav.navigateRoot(['/restaurants']);
      },
      async error => (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding restaurant'
      })).present()
    );
  }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newRes.image = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newRes.image = photo.dataUrl as string;
  }

}


