import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonicModule,
  AlertController,
  Platform,
  IonRefresher,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RestaurantsService } from '../../services/restaurants.service';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-restaurant-comments',
  templateUrl: './restaurant-comments.component.html',
  styleUrls: ['./restaurant-comments.component.scss'],
  standalone:true,
  imports: [CommonModule, IonicModule]
})
export class RestaurantCommentsComponent implements OnInit {

  idRest!: number;
  comments!: Comment[];
  resumeSub!: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService,
    private platform: Platform,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadComments();
    // If the app comes back from being paused, reload comments
    this.resumeSub = this.platform.resume.subscribe(
      () => this.ngZone.run(() => this.loadComments()) // Needs NgZone because Angular doesn't detect this event
    );
  }

  ngOnDestroy(): void {
    this.resumeSub.unsubscribe();
  }

  loadComments(refresher?: IonRefresher) {
    this.idRest = +this.route.snapshot.parent!.params['id'];
    this.restaurantsService.getComments(this.idRest).subscribe((comments) => {
      this.comments = comments;
      refresher?.complete();
    });
  }

  async addComment() {
    const alert = await this.alertCtrl.create({
      header: 'New commment',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Enter your comment',
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.restaurantsService
        .addComment(this.idRest, result.data.values.comment)
        .subscribe((comment) => this.comments.push(comment));
    }
  }

}
