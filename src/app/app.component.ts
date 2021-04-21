import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PetProject';
  constructor(private db: AngularFirestore) {
    const things = db.collection('pet').valueChanges();
    things.subscribe(console.log);
  }
}
