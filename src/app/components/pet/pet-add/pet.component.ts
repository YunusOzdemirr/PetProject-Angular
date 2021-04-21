import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { User } from 'src/app/models/user';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  filterText = '';
  pet: Pet = new Pet();
  constructor(private petService: PetService) {
    // this.firestore
    //   .collection("Pet")
    //   .get()
    //   .subscribe((ss) => {
    //     ss.docs.forEach((doc) => {
    //       this.myArray.push(doc.data());
    //     });
    //   });
    // this.firestore.collection('Pet').add({ field: this.form.value.name });

  }

  ngOnInit(): void {
    //this.petService.getPetsList();
  }
  // updateActive() {
  //   this.petService.updatePet(this.pet.id, {})
  //     .catch(err => console.log(err));
  // }
  // deletePet() {
  //   this.petService
  //     .deletePet(this.pet.id)
  //     .catch(err => console.log(err));
  // }

  // getPetsList() {
  //   this.petService.getPetsList().snapshotChanges().pipe(
  //     map((changes: any) =>
  //       changes.map((c: any) =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe((pets: Pet[]) => {
  //     this.pets = pets;
  //   });
  // }
  // form = new FormGroup({
  //   petForm: new FormControl('')
  // })

  onSubmit() {
    // new Pet{
    //   name: this.pet,
    // }
    this.petService.createPet(Object.assign({ Pet }, this.pet));
    console.log(this.pet)
  }

}
