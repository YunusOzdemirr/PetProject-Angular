import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public usersForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getAll();
    this.userForm();
  }

  userForm() {
    this.usersForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      petName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      photoUrl: [''],
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
  submitStudentData() {
    this.userService.createUser(this.usersForm.value); // Submit student data using CRUD API
    this.toastr.success(this.usersForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
  };
}
