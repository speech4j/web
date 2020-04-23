import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Credentials } from '../models/Credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<Boolean>(false);

  constructor(private router: Router) { }

  get isLoggedin() {
    return this.loggedIn.asObservable();
  }

  login(credentials: Credentials) {
    if (credentials.email === 'example@gmail.com' && credentials.password === 'QWE123qwe') {
      this.loggedIn.next(true);
      this.router.navigate(['/welcome']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
