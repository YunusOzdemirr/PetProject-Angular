import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  public petsForm: FormGroup;
  pet: Pet = new Pet();
  constructor(private petService: PetService,
    private fb: FormBuilder,
    public toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.petForm();
    //this.petService.getPetsList();
  }
  petForm() {
    this.petsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      animalType: ['', [Validators.required, Validators.minLength(2)]],
      photoUrl: [''],
    })
  }
  get name() {
    return this.petsForm.get('name');
  }
  get userName() {
    return this.petsForm.get('userName');
  }
  get animalType() {
    return this.petsForm.get('animalType');
  }
  get photoUrl() {
    return this.petsForm.get('photoUrl');
  }

  // Reset student form's values
  ResetForm() {
    this.petsForm.reset();
  }
  submitPetData() {
    this.petService.createPet(this.petsForm.value); // Submit student data using CRUD API
    this.toastr.success(this.petsForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
  };
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

  // onSubmit() {
  //   // new Pet{
  //   //   name: this.pet,
  //   // }
  //   this.petService.createPet(Object.assign({ Pet }, this.pet));
  //   console.log(this.pet)
  // }

}
