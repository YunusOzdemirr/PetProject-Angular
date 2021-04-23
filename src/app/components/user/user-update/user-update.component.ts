import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { FileUpload } from "src/app/models/FileUpload";
import { FileUploadService } from "src/app/services/file-upload.service";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  editForm: FormGroup;
  title = "Create";
  currentFileUpload: FileUpload;
  errorMessage: any;
  selectedFiles: FileList;
  percentage: number;
  user = new User();
  userId: string;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private uploadService: FileUploadService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.actRoute.snapshot.params["id"]) {
      this.userId = this.actRoute.snapshot.paramMap.get("id") || "id gelmiyor";
      console.log(this.userId);
    }
  }

  ngOnInit(): void {
    if (this.userId) {
      this.title = "Edit";
      this.userService.getUserById(this.userId).subscribe((result: any) => {
        if (result) {
          this.user = result;
          this.updateUserData(result.name, result.email, result.photoURL);
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

  updateUserData(name: string, email: string, photoURL: string) {
    this.editForm = this.fb.group({
      name: [name],
      email: [
        email,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
      photoURL: [photoURL],
    });
  }

  goBack() {
    this.router.navigate(["/general-page"]);
  }

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
  getUser(user: string) {
    this.userId = user;
    this.userService.getUserById(user).subscribe((response: any) => {
      this.editForm.patchValue({
        id: response.data.id,
        name: response.data.name,
        photoURL: response.data.photoURL,
        email: response.data.email,
      });
      console.log(this.userId);
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file: any = this.selectedFiles.item(0);

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage) => {
        this.percentage = Math.round(percentage);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
