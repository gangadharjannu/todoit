import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { AppConstants } from '../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject$: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  constructor(private commonService: CommonService, private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }
  get currentUserValue() {
    return this.currentUserSubject$.value;
  }
  login(username: string, password: string) {
    return this.http
      .post(`${AppConstants.API_BASE_URL}login`, { username, password })
      .pipe(
        map((user: User) => {
          if (user && user.token) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject$.next(user);
          }
        })
      );
  }
  register(username: string, password: string) {
    return this.http.post(`${AppConstants.API_BASE_URL}register`, {
      username,
      password
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject$.next(null);
  }
}
