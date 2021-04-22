import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-pet-detail",
  templateUrl: "./pet-detail.component.html",
  styleUrls: ["./pet-detail.component.css"],
})
export class PetDetailComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  goBack() {
    this.location.back();
  }
}
