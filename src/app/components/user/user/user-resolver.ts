import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<User> {

    let user = new User();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        if(res.providerData[0].providerId == 'password'){
          user.photoURL = 'https://via.placeholder.com/400x300';
          user.name = res.name;
          user.petName=res.petName;
          user.email=res.email;
          user.password=res.email;
          user.id=res.id;
          return resolve(user);
        }
        else{
            user.photoURL = 'https://via.placeholder.com/400x300';
            user.name = res.name;
            user.petName=res.petName;
            user.email=res.email;
            user.password=res.email;
            user.id=res.id;
          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
