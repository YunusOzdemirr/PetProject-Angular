import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  userList: User[];
  p: number = 1;
  User: Observable<User[]>;
  filterText = "";
  hideWhenNoUser: boolean = false;
  noData: boolean = false;
  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserList()
      .subscribe((data: User[]) => (this.userList = data));
    console.log(this.userList);
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
