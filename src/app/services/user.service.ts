import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  constructor(public angularFirestore: AngularFirestore, private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }
  getUserList(): Observable<any> {
    const userList = this.angularFirestore.collection('users').snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          c => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as {}
          }));
      }));
    return userList;
  }
  createUser(user: User) {
    return this.angularFirestore.collection('users').add({
      name: user.name,
      email: user.email,
      petName: user.petName,
      photoURL: user.photoURL,
    });
  }
  GetUsersList() {
    this.usersRef = this.db.list(this.dbPath);
    console.log(this.usersRef);
    // return this.usersRef;

  }
  getAll(): AngularFireList<User> {
    return this.usersRef;
  }
  getUserById(userId: string) {
    const userData = this.angularFirestore.doc('users/' + userId).valueChanges();
    return userData;
  }

  update(key: string, value: User) {
    //return this.usersRef.update(key, value);
    const userData = JSON.parse(JSON.stringify(value));
    return this.angularFirestore.doc('users/' + key).update(userData);
  }

  delete(key: string) {
    return this.angularFirestore.doc('users/' + key).delete();
  }
}
