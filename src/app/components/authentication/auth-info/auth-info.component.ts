import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
@Component({
  selector: "app-auth-info",
  templateUrl: "./auth-info.component.html",
  styleUrls: ["./auth-info.component.css"],
})
export class AuthInfoComponent implements OnInit {
  constructor(@Inject(String) public uid: string) {}

  ngOnInit(): void {}
  isLoggedIn() {
    return !!this.uid;
  }
}
