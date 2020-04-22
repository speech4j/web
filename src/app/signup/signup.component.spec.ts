import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Credentials } from '../models/Credentials';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        ReactiveFormsModule,
      ],    
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid when empty`, () => {
    console.log("Form validation test");
    expect(component.signupForm.valid).toBeFalsy();
  });

  it(`email validity`, () => {
    console.log("Email validation test");
    let errors = {};
    let email = component.signupForm.controls['email'];
    // invalid when empty
    expect(email.valid).toBeFalsy();

    // email is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // should be valid, contain '@'
    email.setValue(".");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    // shouldn't be longer than 64 symbols
    email.setValue("long@mail.comgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood");
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();

    // should be correct
    email.setValue("good@mail.com");
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });

  it(`password validity`, () => {
    console.log("Password validation test");

    console.log("email validation test");
    let errors = {};
    let password = component.signupForm.controls['password'];
    // invalid when empty
    expect(password.valid).toBeFalsy();

    // password is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // should be valid, contain '@'
    password.setValue(".!@");
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    // shouldn't be longer than 32 symbols
    password.setValue("longpasswordcomgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood");
    errors = password.errors || {};
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();

    // should be correct
    password.setValue("GoodPassword123");
    errors = password.errors || {};
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });

  it(`confirm password should match password`, () => {
    console.log("Confirm password test");

    let errors = {};
    let password = component.signupForm.controls['password']
    let confirmPassword = component.signupForm.controls['confirmPassword'];
    // invalid when empty
    expect(confirmPassword.valid).toBeFalsy();

    // confirmPassword is required
    errors = confirmPassword.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['mustMatch']).toBeFalsy();

    // should be valid, contain '@'
    password.setValue("Validpassword123");
    confirmPassword.setValue("ValidPassword123");
    errors = confirmPassword.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['mustMatch']).toBeTruthy();

    // should be correct
    password.setValue("GoodPassword123");
    confirmPassword.setValue("GoodPassword123");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it(`submitting a form emits credentials`, () => {
    expect(component.signupForm.valid).toBeFalsy();
    component.signupForm.controls['email'].setValue("super@dog.com");
    component.signupForm.controls['password'].setValue("GoodBoy123");
    component.signupForm.controls['confirmPassword'].markAsTouched();
    component.signupForm.controls['confirmPassword'].setValue("GoodBoy123");
    expect(component.signupForm.valid).toBeTruthy();

    let credentials: Credentials;

    // Subscribe to the Emitter and store the credentials in a local variable.
    component.signupEmitter.subscribe((value) => credentials = value);

    // Trigger the onSubmit function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(credentials.email).toBe("super@dog.com");
    expect(credentials.password).toBe("GoodBoy123");
  });
});
