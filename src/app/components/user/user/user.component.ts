import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User= new User() ;
  profileForm: FormGroup;
  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['users'];
      if (data) {
        this.user = data;
        console.log(data);
        this.createForm(this.user.name,this.user.email,this.user.photoURL,this.user.password,this.user.petName);
      }
    })
  }

  createForm(name: any, email:any,photoUrl:any,password:any,petName:any) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      photoURL: ['', Validators.required],
      email: [email, Validators.required],
      petName:['',Validators.required],
      password: ['', Validators.required]
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
