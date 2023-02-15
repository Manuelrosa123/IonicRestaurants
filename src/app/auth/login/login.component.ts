import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
//import { PushNotifications, Token } from '@capacitor/push-notifications';
import {
  AlertController,
  IonicModule,
  NavController,
  Platform,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  firebaseToken = '';
  lat=0;
  lng=0;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
  }

  login() {
    this.authService
      .login(this.email, this.password, this.firebaseToken,this.lat, this.lng)
      .subscribe({
        next: () => this.navCtrl.navigateRoot(['/restaurants']),
        error: async (error) => {
          (
            await this.alertCtrl.create({
              header: 'Login error',
              message: 'Incorrect email and/or password',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }
}
