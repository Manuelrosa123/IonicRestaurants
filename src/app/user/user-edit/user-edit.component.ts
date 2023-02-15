import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  imports: [CommonModule,FormsModule,IonicModule],
  styleUrls: ['./user-edit.component.scss'],
  standalone:true,
})
export class UserEditComponent implements OnInit {

  @ViewChild('editName') editName!: NgForm;
  @ViewChild('editPass') editPass!: NgForm;

  ngOnInit(){

  }
  name!:string;
  email!:string;
  password!:string;
  password2!:string;

  constructor(
    private readonly userService:UserService,
    private readonly router: Router
  ) {}

  editNameEvent()
  {
    this.userService.editName(this.name,this.email).subscribe(()=>{
      this.router.navigate(['user/me']);
    });
  }

  editPasswordEvent()
  {
    this.userService.editPassword(this.password).subscribe(()=>{
      this.router.navigate(['user/me']);
    });
  }

  editPhotoEvent()
  {
    this.userService.editPhoto((document.getElementById("photo") as HTMLImageElement).src).subscribe(()=>{
      this.router.navigate(['user/me']);
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      (document.getElementById('photo') as HTMLInputElement).src = reader.result as string;
    });
  }

}
