import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { FileUploadService } from "src/app/services/file-upload.service";
import { FileUpload } from "src/app/models/FileUpload";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  userList: User[];
  p: number = 1;
  User: Observable<User[]>;
  fileUploads: FileUpload[];
  filterText = "";
  hideWhenNoUser: boolean = false;
  noData: boolean = false;
  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private router: Router,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserList()
      .subscribe((data: User[]) => (this.userList = data));
    console.log(this.userList);

    this.uploadService
      .getFiles(6)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads: any) => {
        this.fileUploads = fileUploads;
        console.log(this.fileUploads);
      });
  }

  goBack() {
    this.router.navigate(["/general-page"]);
  }
  deleteUser(user: User) {
    if (window.confirm("Bu kullanıcıyı silmek istediğine emin misiniz ?")) {
      this.userService.delete(user.id);
      this.toastr.success(user.name + " başarıyla silindi!");
    }
  }
}
