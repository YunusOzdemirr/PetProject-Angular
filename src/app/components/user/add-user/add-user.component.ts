import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public usersForm: FormGroup;
  userId: string;
  title = "Create";
  user: User;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.userService.getAll();
    this.userForm();
    // if (this.activatedRoute.snapshot.params['id']) {
    //   this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    // }
    if (this.userId) {
      this.title = 'Edit';
      this.userService.getUserById(this.userId).subscribe(
        (result: any) => {
          if (result) {
            this.user = result;
          }
        }
      );
    }
  }
  onUserFormSubmit() {
    if (this.userId) {
      this.userService.update(this.userId, this.user).then(
        () => {
          this.router.navigate(['/']);
        }
      );
    } else {
      this.submitUserData();

    }
  }
  userForm() {
    this.usersForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      petName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      photoURL: [''],
    })
  }

  get name() {
    return this.usersForm.get('name');
  }
  get petName() {
    return this.usersForm.get('petName');
  }
  get email() {
    return this.usersForm.get('email');
  }
  get photoUrl() {
    return this.usersForm.get('photoUrl');
  }

  // Reset student form's values
  ResetForm() {
    this.usersForm.reset();
  }
  submitUserData() {
    this.userService.createUser(this.usersForm.value); // Submit student data using CRUD API
    this.toastr.success(this.usersForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
  };
}
