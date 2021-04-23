import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import { SignUpComponent } from "../components/authentication/sign-up/sign-up.component";
import { User } from "../models/user";
import { map, switchMap, tap } from "rxjs/operators";
import firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  uid: any;
  userData: any;
  public loggedIn = false;
  private user: Observable<firebase.User | null>;
  private userDetails: firebase.User | null = null;

  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private angularFireStore: AngularFirestore
  ) {
    this.user = afAuth.authState;
    this.user.subscribe((user: any) => {
      if (user) {
        this.userDetails = user;

        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
    // this.userData = this.afAuth.authState.pipe(
    //     switchMap(user => {
    //         if (user) {
    //             return this.db.doc<User>(`users/${user.uid}`).valueChanges();
    //         } else {
    //             return of(null);
    //         }
    //     })
    // );
  }

  getUserId(): string {
    return this.uid;
  }

  getCurrentUser(): string | any {
    return sessionStorage.getItem("user") || undefined;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  doRegister(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            resolve(res);
            this.loggedIn = true;
          },
          (err) => reject(err)
        );
    });
  }

  doLogOut() {
    return new Promise<void>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.signOut();
        resolve();
        this.loggedIn = false;
      } else {
        reject();
      }
    });
  }

  // logUserIn(email: any, pass: any) {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, pass)
  //     .catch(function (error) {
  // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log("error" + error);
  //     });
}
