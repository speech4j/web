import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormControl, Validators, EmailValidator } from '@angular/forms';
import { Credentials } from '../models/Credentials';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let showPasswordCheckbox: HTMLInputElement;

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent
      ],
      imports: [
        ReactiveFormsModule,
      ],    
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      showPasswordCheckbox = fixture.debugElement.nativeElement.querySelector('#showpassword');
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log("Component creation test");
    expect(component).toBeTruthy();
  });

  it(`should have type equals to 'password'`, async(() => {
    console.log("Password input initial type test");
    let inputType = fixture.debugElement.nativeElement.querySelector('#password').type;
    expect(inputType).toEqual('password');
  }));

  it(`should toggle type to 'text' and vice versa`, async(() => {
    console.log("Show password toggle test");
    showPasswordCheckbox.click();
    let inputTypeFirst = fixture.debugElement.nativeElement.querySelector('#password').type;
    console.log("Input type after first click is: "+inputTypeFirst);
    expect(inputTypeFirst).toEqual('text');

    showPasswordCheckbox.click();
    let inputTypeSecond = fixture.debugElement.nativeElement.querySelector('#password').type;
    console.log("Input type after second click is: "+inputTypeSecond);
    expect(inputTypeSecond).toEqual('password');
  }));

  it(`form should be invalid when empty`, () => {
    console.log("Form validation test");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`email validity`, () => {
    console.log("Email validation test");
    let errors = {};
    let email = component.loginForm.controls['email'];
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
    let password = component.loginForm.controls['password'];
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

  it(`submitting a form emits credentials`, () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("super@dog.com");
    component.loginForm.controls['password'].setValue("GoodBoy123");
    expect(component.loginForm.valid).toBeTruthy();

    let credentials: Credentials;

    // Subscribe to the Emitter and store the credentials in a local variable.
    component.loginEmitter.subscribe((value) => credentials = value);

    // Trigger the onSubmit function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(credentials.email).toBe("super@dog.com");
    expect(credentials.password).toBe("GoodBoy123");
  });
});
