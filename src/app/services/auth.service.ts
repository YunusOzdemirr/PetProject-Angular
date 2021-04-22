import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import { SignUpComponent } from "../components/user/sign-up/sign-up.component";
import { User } from "../models/user";
import { map, switchMap, tap } from "rxjs/operators";
import firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  uid: any;
  userData: any;
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private angularFireStore: AngularFirestore
  ) {
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
          },
          (err) => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise<void>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
