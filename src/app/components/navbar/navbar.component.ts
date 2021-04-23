import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  title = "PetProject";
  user: User = new User();
  currentUserId: string;
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.route.snapshot.params["id"]) {
      this.currentUserId =
        this.route.snapshot.paramMap.get("id") || "id gelmiyor";
      console.log(this.currentUserId);
    }
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    console.log(this.currentUserId);
  }

  logout() {
    this.authService.doLogOut().then(
      (res) => {
        this.router.navigate(["/login-user"]);
      },
      (error) => {
        console.log("Logout error", error);
      }
    );
  }
}
