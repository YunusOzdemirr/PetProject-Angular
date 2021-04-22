import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  userList: User[];
  p: number = 1;
  User: Observable<User[]>;
  hideWhenNoUser: boolean = false;
  noData: boolean = false;
  constructor(private userService: UserService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.userService
      .getUserList()
      .subscribe((data: User[]) => (this.userList = data));
    console.log(this.userList);
  }

  deleteUser(user: User) {
    if (window.confirm("Bu kullanıcıyı silmek istediğine emin misiniz ?")) {
      this.userService.delete(user.id);
      this.toastr.success(user.name + " başarıyla silindi!");
    }
  }
}
