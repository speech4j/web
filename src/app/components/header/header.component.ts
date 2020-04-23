import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileClicked: boolean = false;
  isLoggedIn$: Observable<Boolean>;

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedin;
  }

  selectProfile() {
    this.profileClicked = !this.profileClicked;
  }

  logOut() {
    this.authService.logout();
  }
}
