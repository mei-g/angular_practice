import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, debounceTime } from 'rxjs'

function mustContainQuestionMark(control: AbstractControl) {
  return {doesNotContainQuestionMark: true};

}

function AsyncValidatorExample(control: AbstractControl) {
  //return an observable
  return of(null);
}

function equalValue(control:AbstractControl) {
  const pwd = control.get('password')?.value;
  const confpwd = control.get('confPassword')?.value;
  if (pwd === confpwd) {
    return null;
  }
  return {passwordNotEqual: true};
}
const savedForm = window.localStorage.getItem('daved-signup-form');
let initialEmail = ''
if (savedForm) {

  initialEmail = JSON.parse(savedForm).email;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
      email: new FormControl(initialEmail, {
        validators: [Validators.email, Validators.required, mustContainQuestionMark],
        asyncValidators: []
      }),
      passwordgrp: new FormGroup({
        password: new FormControl('',  {
          validators: [Validators.email, Validators.minLength(5)]
        }),
        confPassword: new FormControl('',  {
          validators: [Validators.email, Validators.minLength(5)]
        })
      }, {validators: [ equalValue ]}),

      firstName: new FormControl('', {
        validators: [Validators.required, mustContainQuestionMark],
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, mustContainQuestionMark],
      }),    
      address: new FormGroup({

        street: new FormControl('', {
          validators: [Validators.required],
        }),
        number: new FormControl('', {
          validators: [Validators.required],
        }), 
        postcode: new FormControl('', {
          validators: [Validators.required],
        }),
        city: new FormControl('', {
          validators: [Validators.required],
        }),  
      }),  
      role: new FormControl<'student'| 'teacher' |'employee' |'founder' | 'other'>('student', {
        validators: [Validators.required, mustContainQuestionMark],
      }), 
      source: new FormArray([

        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ]),
      agree: new FormControl(false, {
        validators: [Validators.required],
      }), 
  });
  ngOnInit () {
    // const savedForm = window.localStorage.getItem('daved-signup-form');
    // if (savedForm) {

    //   const savedEmail = JSON.parse(savedForm).email;
    //   this.form.patchValue({email: savedEmail});
    // }

    const subscription = this.form?.valueChanges?.pipe(debounceTime(500)).subscribe({

        next: (value)=> {
          console.log(value);
          window.localStorage.setItem('saved-signup-form',JSON.stringify({email:value.email}))
        }
      },);
    this.destroyRef.onDestroy(()=> subscription?.unsubscribe());

  }
  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.controls.email;
    // const enteredPwd = this.form.controls.get('').password;
  }
  get emailIsInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.invalid && this.form.controls.email.dirty;
  }

  OnCancel(){
    this.form.reset();
  }
}
