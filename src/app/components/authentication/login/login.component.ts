import { Component, OnInit } from "@angular/core";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  // login() {
  //   this.authService.logUserIn(
  //     this.loginForm.value.email,
  //     this.loginForm.value.password
  //   );
  // }
  tryLogin(value: any) {
    this.authService.doLogin(value).then(
      (res) => {
        this.router.navigate(["/general-page"]);
      },
      (err) => {
        console.log(err);
        this.errorMessage = "Böyle bir kullanıcı yok veya silinmiş";
        // this.errorMessage = err.message;
      }
    );
  }
}
