import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appUser$: Observable<User>;

  constructor(public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore) {


    //   this.appUser$ = this.afAuth.authState.pipe(
    //     switchMap(user => {
    //       // If the user is logged in, return the user details.
    //       if (user) {
    //         return this.db.doc<User>(`appusers/${user.uid}`).valueChanges();
    //       } else {
    //         // If the user is NOT logged in, return null.
    //         return of(null);
    //       }
    //     })
    //   );
    // }

    // async login() {

    //   // Store the return URL in localstorage, to be used once the user logs in successfully
    //   const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || this.router.url;
    //   localStorage.setItem('returnUrl', returnUrl);

    //   const credential = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //   return this.updateUserData(credential.user);
    // }

    // async logout() {
    //   await this.afAuth.auth.signOut().then(() => {
    //     this.router.navigate(['/']);
    //   });
    // }

    // // Save the user data to firestore on login
    // private updateUserData(user) {
    //   const userRef = this.db.doc(`appusers/${user.uid}`);
    //   const data = {
    //     name: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL
    //   };
    //   return userRef.set(data, { merge: true });
    // }
  }

}
