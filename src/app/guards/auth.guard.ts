import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
      return this.authService.isLoggedin
        .pipe(
          take(1),
           map((isLoggedin:boolean) => {
            if (!isLoggedin) {
              this.router.navigate(['/login']);
              return false;
            }
            return true
          })
        );
  }
}
