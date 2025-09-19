import { AuthModel } from './auth-model';
import { AuthResponse } from './auth-response';

export interface Adapter {
  adapt(data: AuthResponse): AuthModel;
}
