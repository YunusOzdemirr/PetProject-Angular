import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  user: User = new User();
  profileForm: FormGroup;
  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      let data = routeData["users"];
      if (data) {
        this.user = data;
        console.log(data);
        this.createForm(
          this.user.name,
          this.user.email,
          this.user.photoURL,
          this.user.password
        );
      }
    });
  }
  goBack() {
    this.router.navigate(["/general-page"]);
  }

  createForm(name: any, email: any, photoUrl: any, password: any) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      photoURL: ["", Validators.required],
      email: [email, Validators.required],
      password: ["", Validators.required],
    });
  }

  save(value: any) {
    this.userService.updateCurrentUser(value).then(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
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
