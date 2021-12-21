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
      .post<{ token: string; expiresIn: number; userId: string }>(
        API + '/login',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
            localStorage.setItem('userId', response.userId);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
