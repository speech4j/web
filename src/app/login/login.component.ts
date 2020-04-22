import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Credentials } from '../models/Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginEmitter = new EventEmitter<Credentials>();

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: this.email = new FormControl('',
          Validators.compose([ 
            Validators.email,
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(64)
          ])
      ),
      password: this.password = new FormControl('', 
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z0-9]*'), 
            Validators.minLength(8), 
            Validators.maxLength(32)
          ])
      )
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginEmitter.emit(
        new Credentials(this.loginForm.value.email, this.loginForm.value.password)
      );
    }
  }

  showPassword() {
    let input = document.getElementById("password") as HTMLInputElement;
    input.type === "password" ? input.type = "text" : input.type = "password";
  }

}
