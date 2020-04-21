import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('',
          Validators.compose([ 
            Validators.email,
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(64)
          ])
      );
      this.password = new FormControl('', 
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z0-9]*'), 
            Validators.minLength(8), 
            Validators.maxLength(32)
          ])
      );
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }

  showPassword() {
    let input = document.getElementById("password") as HTMLInputElement;
    input.type === "password" ? input.type = "text" : input.type = "password";
  }

}
