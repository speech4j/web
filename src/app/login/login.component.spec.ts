import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormControl, Validators } from '@angular/forms';

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
    expect(component).toBeTruthy();
  });

  it(`should have type equals to 'password'`, async(() => {
    let inputType = fixture.debugElement.nativeElement.querySelector('#password').type;
    expect(inputType).toEqual('password');
  }));

  it(`should toggle type to 'text' and vice versa`, async(() => {
    showPasswordCheckbox.click();
    let inputTypeFirst = fixture.debugElement.nativeElement.querySelector('#password').type;
    console.log("Input type after first click is: "+inputTypeFirst);
    expect(inputTypeFirst).toEqual('text');

    showPasswordCheckbox.click();
    let inputTypeSecond = fixture.debugElement.nativeElement.querySelector('#password').type;
    console.log("Input type after second click is: "+inputTypeSecond);
    expect(inputTypeSecond).toEqual('password');
  }));
});
