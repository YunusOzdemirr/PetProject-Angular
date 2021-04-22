import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-pet-update",
  templateUrl: "./pet-update.component.html",
  styleUrls: ["./pet-update.component.css"],
})
export class PetUpdateComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  goBack() {
    this.location.back();
  }
}
