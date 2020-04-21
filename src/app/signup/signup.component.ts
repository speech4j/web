import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'; 
import { MustMatch } from '../match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

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
      this.confirmPassword = new FormControl('', Validators.required);
  }

  createForm() {
    this.signupForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    console.warn(this.signupForm.value);
  }
}
