import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { PetService } from "src/app/services/pet.service";
import { Pet } from "src/app/models/pet";
@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  editForm: FormGroup;
  title = "Create";
  errorMessage: any;
  user = new User();
  userId: string;
  petList: Pet[];
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private petService: PetService
  ) {
    if (this.actRoute.snapshot.params["id"]) {
      this.userId = this.actRoute.snapshot.paramMap.get("id") || "id gelmiyor";
      console.log(this.userId);
    }
  }

  ngOnInit(): void {
    this.updateUserData();
    this.petService
      .getPetList()
      .subscribe((data: Pet[]) => (this.petList = data));
    if (this.userId) {
      this.title = "Edit";
      this.userService.getUserById(this.userId).subscribe((result: any) => {
        if (result) {
          this.user = result;
          this.user.name = result.name;
          console.log(result);
        }
      });
    }
  }

  get name() {
    return this.editForm.get("name");
  }
  get email() {
    return this.editForm.get("email");
  }
  get photoURL() {
    return this.editForm.get("photoURL");
  }
  get petName() {
    return this.editForm.get("petName");
  }

  updateUserData() {
    this.editForm = this.fb.group({
      petName: ["", [Validators.required]],
    });
  }

  goBack() {
    this.router.navigate(["/general-page"]);
  }

  onUserFormSubmit() {
    if (this.userId) {
      this.userService.update(this.userId, this.editForm.value).then(() => {
        this.toastr.success(this.user.name + " başarıyla güncelleştirildi");
        this.router.navigate(["/view-users"]);
      });
    } else {
      this.userService.saveUser(this.user).then(() => {
        this.router.navigate(["/view-users"]);
      });
    }
  }

  getUser(user: string) {
    this.userId = user;
    this.userService.getUserById(user).subscribe((response: any) => {
      this.editForm.patchValue({
        id: response.data.id,
        name: response.data.name,
        photoURL: response.data.photoURL,
        email: response.data.email,
        petName: response.data.petName,
      });
      console.log(this.userId);
    });
  }
}
