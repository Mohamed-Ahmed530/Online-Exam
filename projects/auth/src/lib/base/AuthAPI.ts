import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/register-request';
import { LoginRequest } from '../interfaces/login-request';
import { EmailVerifyData } from '../interfaces/email-verify-data';
import { CodeVerifyData } from '../interfaces/code-verify-data';
import { ResetPasswordData } from '../interfaces/reset-password-data';
import { AuthModel } from '../interfaces/auth-model';
import { EmailVerifyResponse } from '../interfaces/email-verify-response';
import { SetCodeVerifyResponse } from '../interfaces/set-code-verify-response';
import { ResetPasswordResponse } from '../interfaces/reset-password-response';
import { LogoutResponse } from '../interfaces/logout-response';

export abstract class AuthAPI {

    abstract Register(data: RegisterRequest): Observable<AuthModel>;
    abstract Login(data: LoginRequest): Observable<AuthModel>;
    abstract setEmailVerify(data: EmailVerifyData): Observable<EmailVerifyResponse>;
    abstract setCodeVerify(data:CodeVerifyData): Observable<SetCodeVerifyResponse>;
    abstract resetPassword(data:ResetPasswordData): Observable<ResetPasswordResponse>
    abstract saveUserData(): void;
    abstract isLoggedInUser(): boolean;
    abstract logout(): Observable<LogoutResponse>;
    abstract clearSession(): void;

}