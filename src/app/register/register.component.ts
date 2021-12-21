import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customer: User = new User();
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    interest: new FormControl(''),
    role: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  onRegister() {
    console.log(this.registerForm.value);
    this._userService
      .registerUser(this.registerForm.value)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
