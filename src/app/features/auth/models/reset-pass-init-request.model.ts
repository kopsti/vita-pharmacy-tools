import {environment} from '@env/environment';

export class ResetPassInitRequest {

  email: string;
  loginUrl: string;

  constructor(email: string) {
    this.email = email;
    this.loginUrl = environment.frontend + '/auth/login';
  }

}
