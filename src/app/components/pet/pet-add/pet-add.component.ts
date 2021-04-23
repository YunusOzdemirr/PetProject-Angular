import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pet",
  templateUrl: "./pet-add.component.html",
  styleUrls: ["./pet-add.component.css"],
})
export class PetComponent implements OnInit {
  public petsForm: FormGroup;
  pet: Pet = new Pet();
  constructor(
    private petService: PetService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.petForm();
  }
  petForm() {
    this.petsForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      userName: ["", [Validators.required, Validators.minLength(2)]],
      animalType: ["", [Validators.required, Validators.minLength(2)]],
      photoUrl: [""],
    });
  }
  get name() {
    return this.petsForm.get("name");
  }
  get userName() {
    return this.petsForm.get("userName");
  }
  get animalType() {
    return this.petsForm.get("animalType");
  }
  get photoUrl() {
    return this.petsForm.get("photoUrl");
  }

  ResetForm() {
    this.petsForm.reset();
  }
  submitPetData() {
    this.petService.createPet(this.petsForm.value);
    this.toastr.success(
      this.petsForm.controls["name"].value + " başarıyla kaydedildi!"
    );
    this.ResetForm();
  }
  goBack() {
    this.router.navigate(["/general-page"]);
  }
}
