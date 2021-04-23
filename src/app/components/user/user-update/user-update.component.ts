import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  editForm: FormGroup;
  title = "Create";
  errorMessage: any;
  user = new User();
  userId: string;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.actRoute.snapshot.params["id"]) {
      this.userId = this.actRoute.snapshot.paramMap.get("id") || "id gelmiyor";
      console.log(this.userId);
    }
  }

  ngOnInit(): void {
    this.updateUserData();
    //const id = this.actRoute.snapshot.paramMap.get("id") ? "" : "";
    //console.log(id);
    // this.userService
    //   .GetUser(id)
    //   .valueChanges()
    //   .subscribe((data) => {
    //     this.editForm.setValue(data);
    //   });

    if (this.userId) {
      this.title = "Edit";
      this.userService.getUserById(this.userId).subscribe((result: any) => {
        if (result) {
          this.user = result;
        }
      });
    }
  }
  get name() {
    return this.editForm.get("name");
  }

  get petName() {
    return this.editForm.get("petName");
  }

  get email() {
    return this.editForm.get("email");
  }

  get photoURL() {
    return this.editForm.get("photoURL");
  }

  updateUserData() {
    this.editForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      petName: [""],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
      photoURL: [""],
    });
  }

  goBack() {
    this.location.back();
  }

  // updateForm() {
  //   this.userService.update(this.editForm.value.id, this.editForm.value); // Update student data using CRUD API
  //   this.toastr.success(
  //     this.editForm.controls["name"].value + " updated successfully"
  //   ); // Show succes message when data is successfully submited
  //   this.router.navigate(["view-users"]); // Navigate to student's list page when student data is updated
  // }

  onUserFormSubmit() {
    if (this.userId) {
      this.userService.update(this.userId, this.editForm.value).then(() => {
        this.toastr.success(
          this.editForm.controls["name"].value + " başarıyla güncelleştirildi"
        );
        this.router.navigate(["/view-users"]);
      });
    } else {
      this.userService.saveUser(this.user).then(() => {
        this.router.navigate(["/view-users"]);
      });
    }
  }
}
