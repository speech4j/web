import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Credentials } from '../../models/Credentials';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) { }

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
    let credentials = new Credentials(this.loginForm.value.email, this.loginForm.value.password)
    if (this.loginForm.valid) {
      this.loginEmitter.emit(
        credentials
      );
    }
    this.authService.login(credentials)
  }

  showPassword() {
    let input = document.getElementById("password") as HTMLInputElement;
    input.type === "password" ? input.type = "text" : input.type = "password";
  }

}
