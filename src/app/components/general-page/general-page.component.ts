import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-general-page",
  templateUrl: "./general-page.component.html",
  styleUrls: ["./general-page.component.css"],
})
export class GeneralPageComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
