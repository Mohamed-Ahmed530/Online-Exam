import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { AuthResponse } from '../interfaces/auth-response';
import { AuthModel } from '../interfaces/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdapterService implements Adapter {
  constructor() {}
  
  adapt(data: AuthResponse):AuthModel {
    return {
      message: data.message,
      token: data.token,
      userName: data.user.username,
      email: data.user.email,
      id: data.user._id,
      role: data.user.role
    };
  }


}