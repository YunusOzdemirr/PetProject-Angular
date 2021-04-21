import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private dbPath = '/pets';
  petsRef: AngularFireList<Pet>;
  //or
  constructor(public angularFirestore: AngularFirestore, private db: AngularFireDatabase) {
    this.petsRef = db.list(this.dbPath);

  }
  // createPet(pet: Pet): any {
  //   return this.petsRef.add(pet);
  // }

  createPet(pet: Pet) {
    return this.angularFirestore.collection('pets').add({
      name: pet.name,
      animalType: pet.animalType,
      userName: pet.userName,
      photoUrl: pet.photoUrl
    });
  }
  getPetList(): Observable<any> {
    const petList = this.angularFirestore.collection('pets').snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          c => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as {}
          }));
      }));
    return petList;
  }

  update(key: string, value: any): any {
    return this.petsRef.update(key, value);
  }
  delete(key: string) {
    return this.angularFirestore.doc('pets/' + key).delete();
  }

}
