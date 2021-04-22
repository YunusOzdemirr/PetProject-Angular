import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  //usersForm: FormGroup;

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  // userId: string;
  // title = "Create";
  // user: User;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    // this.userForm();
    // if (this.userId) {
    //   this.title = 'Edit';
    //   this.userService.getUserById(this.userId).subscribe(
    //     (result: any) => {
    //       if (result) {
    //         this.user = result;
    //       }
    //     }
    //   );
    // }
  }
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      petName: [''],
      photoURL: [''],
    });
  }
  tryRegister(value: any) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }


  // onUserFormSubmit() {
  //   if (this.userId) {
  //     this.userService.update(this.userId, this.user).then(
  //       () => {
  //         this.router.navigate(['/']);
  //       }
  //     );
  //   } else {
  //     this.submitUserData();

  //   }
  // }
  // userForm() {
  //   this.usersForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(2)]],
  //     petName: [''],
  //     email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  //     photoURL: [''],
  //   })
  // }

  // get name() {
  //   return this.usersForm.get('name');
  // }
  // get petName() {
  //   return this.usersForm.get('petName');
  // }
  // get email() {
  //   return this.usersForm.get('email');
  // }
  // get photoUrl() {
  //   return this.usersForm.get('photoUrl');
  // }

  // // Reset student form's values
  // ResetForm() {
  //   this.usersForm.reset();
  // }
  // submitUserData() {
  //   this.userService.createUser(this.usersForm.value); // Submit student data using CRUD API
  //   this.toastr.success(this.usersForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
  //   this.ResetForm();  // Reset form when clicked on reset button
  // };

}
