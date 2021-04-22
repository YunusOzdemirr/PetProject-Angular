import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-pet-list",
  templateUrl: "./pet-list.component.html",
  styleUrls: ["./pet-list.component.css"],
})
export class PetListComponent implements OnInit {
  petList: Pet[];
  p: number = 1;
  Pet: Observable<Pet[]>;
  hideWhenNoPet: boolean = false;
  noData: boolean = false;
  constructor(
    private petService: PetService,
    public toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.petService
      .getPetList()
      .subscribe((data: Pet[]) => (this.petList = data));
  }

  deleteUser(pet: Pet) {
    if (window.confirm("Bu Evcil hayvanı silmek istediğine emin misiniz ?")) {
      this.petService.delete(pet.id);
      this.toastr.success(pet.name + " başarıyla silindi!");
    }
  }
  goBack() {
    this.location.back();
  }
}
