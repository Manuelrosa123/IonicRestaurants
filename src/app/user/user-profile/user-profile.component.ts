import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/auth/interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
//import { ArcgisMapComponent } from 'src/app/maps/arcgis-map/arcgis-map.component';
//import { ArcgisMarkerDirective } from 'src/app/maps/arcgis-marker/arcgis-marker.directive';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fs-user-profile',
  standalone: true,
  imports: [CommonModule/*,ArcgisMapComponent,ArcgisMarkerDirective*/,IonicModule,RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
    user!: User;

    constructor(
      public environmentInjector: EnvironmentInjector,
      private readonly userService: UserService,
      private readonly router: Router,
      private readonly route:ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.userService.getUserMe().subscribe((r)=>this.user = r);
      this.route.data.subscribe((data)=>this.user=data['user']);
    }

    edit(){
      this.router.navigate(['user/edit']);
    }
}
