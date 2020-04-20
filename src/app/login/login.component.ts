import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showPassword() {
    let input = document.getElementById("password") as HTMLInputElement;
    input.type === "password" ? input.type = "text" : input.type = "password";
  }

}
