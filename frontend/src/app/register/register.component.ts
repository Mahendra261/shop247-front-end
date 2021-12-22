import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customer: User = new User();
  registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    console.log(this.registerForm.value);
    this._userService
      .registerUser(this.registerForm.value)
      .subscribe((result) => {
        this._route.navigate(['login']);
        this.registerForm.reset();
      });
  }
}
