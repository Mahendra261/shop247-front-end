import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showForm: boolean = false;
  user: User = new User();
  id: any;

  constructor(private _userService: UserService, private router: Router) {}

  addressForm: FormGroup = new FormGroup({
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    state: new FormControl(''),
  });

  ngOnInit(): void {
    console.log('inside');
    this.id = localStorage.getItem('userId');
    this._userService.getUserById(this.id).subscribe(
      (result) => {
        console.log(result);
        this.user = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEditAddress() {
    let reqUser = {
      address: {
        streetAddress: this.addressForm.value.streetAddress,
        zip: this.addressForm.value.zip,
        state: this.addressForm.value.state,
        city: this.addressForm.value.city,
      },
    };

    this._userService.updateUser(this.id, reqUser).subscribe(
      (result) => {
        console.log(result);
        this.user = result;
        //get user by id details again
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('submitted', reqUser);
    this.showForm = false;
  }
}
