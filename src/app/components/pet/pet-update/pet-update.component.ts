import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-pet-update",
  templateUrl: "./pet-update.component.html",
  styleUrls: ["./pet-update.component.css"],
})
export class PetUpdateComponent implements OnInit {
  editForm: FormGroup;
  title = "Create";
  errorMessage: any;
  pet = new Pet();
  petId: string;
  constructor(
    private location: Location,
    private petService: PetService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.actRoute.snapshot.params["id"]) {
      this.petId = this.actRoute.snapshot.paramMap.get("id") || "id gelmiyor";
      console.log(this.petId);
    }
  }

  ngOnInit(): void {
    this.updatePetData();

    if (this.petId) {
      this.title = "Edit";
      this.petService.getPetById(this.petId).subscribe((result: any) => {
        if (result) {
          this.pet = result;
          console.log(result);
        }
      });
    }
  }
  get name() {
    return this.editForm.get("name");
  }

  get userName() {
    return this.editForm.get("userName");
  }

  get animalType() {
    return this.editForm.get("animalType");
  }

  get photoUrl() {
    return this.editForm.get("photoUrl");
  }

  updatePetData() {
    this.editForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      animalType: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      photoUrl: ["", [Validators.required]],
    });
  }

  onPetFormSubmit() {
    if (this.petId) {
      this.petService.update(this.petId, this.editForm.value).then(() => {
        this.toastr.success(
          this.editForm.controls["name"].value + " başarıyla güncelleştirildi"
        );
        this.router.navigate(["/view-pets"]);
      });
    } else {
      this.petService.savePet(this.pet).then(() => {
        this.router.navigate(["/view-pets"]);
      });
    }
  }
  goBack() {
    this.router.navigate(["/general-page"]);
  }
}
