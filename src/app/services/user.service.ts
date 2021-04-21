import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  constructor(public angularFirestore: AngularFirestore, private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  createUser(user: User) {
    return this.angularFirestore.collection('users').add({
      name: user.name,
    });
  }
  getAll(): AngularFireList<User> {
    return this.usersRef;
  }
  update(key: string, value: any): any {
    return this.usersRef.update(key, value);
  }
  delete(key: string): any {
    return this.usersRef.remove(key);
  }
}
