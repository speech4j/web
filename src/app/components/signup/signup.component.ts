import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'; 
import { MustMatch } from '../../match.validator';
import { Credentials } from '../../models/Credentials';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Output() signupEmitter = new EventEmitter<Credentials>();

  signupForm: FormGroup;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.formBuilder.group({
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
      ),
      confirmPassword: this.confirmPassword = new FormControl('', Validators.required)
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signupEmitter.emit(
        new Credentials(this.signupForm.value.email, this.signupForm.value.password)
      );
    }
  }
}
