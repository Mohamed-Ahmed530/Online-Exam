import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth';
import { ButtonModule } from 'primeng/button';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { SocialIconsComponent } from "../../../Shared/components/ui/social-icons/social-icons.component";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageComponent } from "../../../Shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, NgClass, SocialIconsComponent, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm!:FormGroup;
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

  initForm(): void{
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    })
  }

  submitForm(): void{
    if (this.loginForm.valid) {
      this.errorMsg.set("");
      if (!this.isCallingAPI()) {
        this.isCallingAPI.set(true);
        this._authService.Login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$), finalize( ()=> this.isCallingAPI.set(false) )).subscribe({
          next:(res)=>{
            if (res.message === "success") {
              timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
                localStorage.setItem("user-token", res.token);
                this._authService.saveUserData();
                this._router.navigate(['/home']);
              })
              this.success.set(res.message);
            }
          },
          error:(err: HttpErrorResponse) => {
            if (err.error.message) {
              this.errorMsg.set(err.error.message);
            }
          }
        })
      }

    }else{
      this.loginForm.markAllAsTouched();
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