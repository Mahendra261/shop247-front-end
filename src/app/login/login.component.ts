import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  customer: User = new User();
  constructor(private _userService: UserService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {}

  onLogin() {
    const formData = this.loginForm.value;
    this._userService.loginUser(formData.email, formData.password);
  }
}
