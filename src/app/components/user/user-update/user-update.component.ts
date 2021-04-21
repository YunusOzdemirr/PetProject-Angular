import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  editForm: FormGroup;
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  get name() {
    return this.editForm.get('name');
  }

  get petName() {
    return this.editForm.get('petName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get photoUrl() {
    return this.editForm.get('photoURL');
  }

  updateUserData() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      petName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      photoURL: ['']
    })
  }
  goBack() {
    this.location.back();
  }

  updateForm() {
    this.userService.update(this.editForm.value.id, this.editForm.value);       // Update student data using CRUD API
    this.toastr.success(this.editForm.controls['name'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-users']);               // Navigate to student's list page when student data is updated
  }

}
