import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { FileUpload } from "src/app/models/FileUpload";
import { FileUploadService } from "src/app/services/file-upload.service";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  userId: string;
  title = "Create";
  user: User;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  usersForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private router: Router,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.userForm();
    if (this.userId) {
      this.title = "Edit";
      this.userService.getUserById(this.userId).subscribe((result: any) => {
        if (result) {
          this.user = result;
        }
      });
    }
  }

  onUserFormSubmit() {
    if (this.userId) {
      this.userService.update(this.userId, this.user).then(() => {
        this.router.navigate(["/"]);
      });
    } else {
      this.submitUserData();
    }
  }

  userForm() {
    this.usersForm = this.fb.group({
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
    this.router.navigate(["/general-page"]);
  }
  get name() {
    return this.usersForm.get("name");
  }
  get petName() {
    return this.usersForm.get("petName");
  }
  get email() {
    return this.usersForm.get("email");
  }
  get photoUrl() {
    return this.usersForm.get("photoUrl");
  }

  ResetForm() {
    this.usersForm.reset();
  }
  submitUserData() {
    this.userService.createUser(this.usersForm.value);
    this.toastr.success(
      this.usersForm.controls["name"].value + "adlı kullanıcı başarıyla eklendi"
    );
    this.router.navigate(["/view-users"]);
    this.ResetForm();
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
