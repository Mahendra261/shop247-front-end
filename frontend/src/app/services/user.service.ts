import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
const API = 'http://localhost:3000/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = '';
  private isAuthenticated: boolean = false;
  constructor(private _http: HttpClient, private router: Router) {}
  user: any = {};
  registerUser(user: any) {
    return this._http.post(API + '/signup', user);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    console.log(authData);
    return this._http
      .post<{
        accessToken: string;
        expiresIn: number;
        userId: string;
        user: { role: string };
      }>(API + '/login', authData)
      .subscribe(
        (response) => {
          console.log('inside response');
          const token = response.accessToken;
          this.token = token;
          if (token) {
            console.log('inside');
            const expiresInDuration = response.expiresIn;
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('role', response.user.role);
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserById(id: string) {
    return this._http.get<User>(API + `/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(API + `/`);
  }
  updateUser(id: any, user: any): Observable<User> {
    console.log(user);
    return this._http.put<User>(`${API}/${id}`, user);
  }
}
