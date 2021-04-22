import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'PetProject';
  user: User = new User();
  profileForm: FormGroup;
  constructor(private db: AngularFirestore, public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

    ngOnInit(): void {
      this.route.data.subscribe(routeData => {
        let data = routeData['data'];
        if (data) {
          this.user = data;
          this.createForm(this.user.name);
        }
      })
      console.log(this.user.name);
    }


  createForm(name: any) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      photoURl: [name, Validators.required],
      email: [name, Validators.required],
      password: [name, Validators.required]
    });
  }

  save(value: any) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }
}
