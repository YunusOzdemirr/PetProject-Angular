import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Location } from "@angular/common";

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
    private db: AngularFirestore,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    if (this.route.snapshot.params["id"]) {
      this.currentUserId =
        this.route.snapshot.paramMap.get("id") || "id gelmiyor";
      console.log(this.currentUserId);
      console.log(this.user);
    }
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();

    console.log(this.currentUserId);
    if (this.currentUserId) {
      this.title = "Edit";
      this.userService
        .getUserById(this.currentUserId)
        .subscribe((result: any) => {
          if (result) {
            this.user = result;
          }
        });
    }
  }

  get name() {
    return this.profileForm.get("name");
  }
  get photoURL() {
    return this.profileForm.get("photoURL");
  }

  createForm(name: any) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      photoURl: [name, Validators.required],
      email: [name, Validators.required],
      password: [name, Validators.required],
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
  getUserDetail() {
    this.userService
      .getUserById(this.currentUserId)
      .subscribe((response: any) => {
        this.user = response.data;
        console.log(this.user.name);
      });
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
