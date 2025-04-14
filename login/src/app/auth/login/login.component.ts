import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  enteredEmail:string = "";
  private form=viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  
  constructor() {
    afterNextRender(()=>{
      const savedForm = window.localStorage.getItem('saved-login-form');
      if(savedForm) {
        const savedEmail = JSON.parse(savedForm).email;
        setTimeout(()=>{
          this.form()?.controls['email'].setValue(savedEmail);
           }, 1
        )
      }
      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
  
          next: (value)=> {
            console.log(value);
            window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}))
          }
        },);
      this.destroyRef.onDestroy(()=> subscription?.unsubscribe());

    })
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    console.log(formData);
    const enteredEmailForm = formData.form.value.email;
    const enteredPwdForm = formData.form.value.password;
    console.log(this.enteredEmail);
    this.enteredEmail = "";
    formData.form.reset();
  }
}
