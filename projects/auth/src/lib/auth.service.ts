import { afterNextRender, inject, Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthAPI';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthEndPoint';
import { AuthAPIAdapterService } from './adapter/auth-api.adapter';
import { RegisterRequest } from './interfaces/register-request';
import { LoginRequest } from './interfaces/login-request';
import { AuthResponse } from './interfaces/auth-response';
import { BASE_URL } from './base-url';
import { jwtDecode } from 'jwt-decode';
import { EmailVerifyData } from './interfaces/email-verify-data';
import { CodeVerifyData } from './interfaces/code-verify-data';
import { ResetPasswordData } from './interfaces/reset-password-data';
import { Router } from '@angular/router';
import { AuthModel } from './interfaces/auth-model';
import { EmailVerifyResponse } from './interfaces/email-verify-response';
import { SetCodeVerifyResponse } from './interfaces/set-code-verify-response';
import { ResetPasswordResponse } from './interfaces/reset-password-response';
import { LogoutResponse } from './interfaces/logout-response';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthAPI  {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdapterService = inject(AuthAPIAdapterService);
  private readonly _BASEURL = inject(BASE_URL);
  private readonly _router = inject(Router);

  userData:BehaviorSubject<JwtPayload | null> = new BehaviorSubject<JwtPayload | null>(null);

  constructor() {
    afterNextRender(() => {
      this.isLoggedInUser();
    })
  }

  Register(data: RegisterRequest): Observable<AuthModel> {
    return this._httpClient.post<AuthResponse>(this._BASEURL + AuthEndPoint.SignUp, data)
    .pipe( map((res) => this._authAPIAdapterService.adapt(res)) );
  }

  Login(data: LoginRequest): Observable<AuthModel> {
    return this._httpClient.post<AuthResponse>(this._BASEURL + AuthEndPoint.SignIn, data)
    .pipe( map((res) => this._authAPIAdapterService.adapt(res)) );
  }


  // Forgot Password
  setEmailVerify(data:EmailVerifyData): Observable<EmailVerifyResponse> {
    return this._httpClient.post<EmailVerifyResponse>(this._BASEURL + AuthEndPoint.forgotPassword, data)
  }
  
  setCodeVerify(data:CodeVerifyData): Observable<SetCodeVerifyResponse> {
    return this._httpClient.post<SetCodeVerifyResponse>(this._BASEURL + AuthEndPoint.Verify, data)
  }
  
  resetPassword(data:ResetPasswordData): Observable<ResetPasswordResponse> {
    return this._httpClient.put<ResetPasswordResponse>(this._BASEURL + AuthEndPoint.ResetPassword, data)
  }
  
  
  // Decode The Token
  saveUserData(): void{
    if (localStorage.getItem("user-token")) {
      this.userData.next( jwtDecode<JwtPayload>( localStorage.getItem("user-token")! ) );
    }
  }

  // Verify user login
  isLoggedInUser(): boolean{
    if (localStorage.getItem("user-token")) {
      this.userData.next( jwtDecode<JwtPayload>( localStorage.getItem("user-token")! ) );
      return true;
    }else{
      return false;
    }
  }


  // Logout API call
  logout(): Observable<LogoutResponse> {
    const token = localStorage.getItem("user-token") || '';
    const headers = new HttpHeaders().set("token", token);

    return this._httpClient.get<LogoutResponse>(this._BASEURL + AuthEndPoint.Logout, {headers})
  }

  // Clear local data + navigate
  clearSession(): void{
    localStorage.removeItem("user-token");
    this.userData.next(null);
    this._router.navigate(['/sign-in'])
  }


}