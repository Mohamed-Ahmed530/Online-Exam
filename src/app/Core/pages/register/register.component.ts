import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth';
import { ButtonModule } from 'primeng/button';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { SocialIconsComponent } from "../../../Shared/components/ui/social-icons/social-icons.component";
import { ErrorMessageComponent } from "../../../Shared/components/ui/error-message/error-message.component";
import { FormInputComponent } from "../../../Shared/components/ui/form-input/form-input.component";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, NgClass, SocialIconsComponent, ErrorMessageComponent, FormInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!:FormGroup;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private destroy$ = new Subject<void>();

  success: WritableSignal<string> = signal("");
  errorMsg: WritableSignal<string> = signal("");
  isCallingAPI: WritableSignal<boolean> = signal(false);
  togglePassword: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this._formBuilder.group({
      username: [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    },{ validators: [this.validateRePassword]})
  }

  // rePassword
  validateRePassword(group:AbstractControl): ValidationErrors | null {
    const password = group.get("password")?.value 
    const rePassword = group.get("rePassword")?.value
    return  password === rePassword ? null : {misMatch:true};
  }

  submitForm(): void{
    if (this.registerForm.valid) {
      this.errorMsg.set("");
      if (!this.isCallingAPI()) {
        this.isCallingAPI.set(true);
        this._authService.Register(this.registerForm.value)
        .pipe(takeUntil(this.destroy$), finalize(()=> this.isCallingAPI.set(false))).subscribe({
          next:(res)=>{
            if (res.message === "success") {
              timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
                this._router.navigate(['/sign-in'])
              })
              this.success.set(res.message);
            }
          },
          error:(err: HttpErrorResponse)=>{
            if (err.error.message) {
              this.errorMsg.set(err.error.message);
            }
          }
        })
      }

    }else{
      this.registerForm.markAllAsTouched();
    }
  }

  // toggle password
  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}