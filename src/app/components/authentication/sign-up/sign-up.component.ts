import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}
  createForm() {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  tryRegister(value: any) {
    this.authService.doRegister(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Hesabınız oluşturuldu";
        this.toastr.success(this.successMessage);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }
}
