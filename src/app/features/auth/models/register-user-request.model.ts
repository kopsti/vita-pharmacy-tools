import {environment} from '@env/environment';

export class RegisterUserRequest {

  username: string;
  pass: string;
  role: string;
  loginUrl: string;

  constructor(username: string, pass: string, role: string) {
    this.username = username;
    this.pass = pass;
    this.role = role;
    this.loginUrl = environment.frontend + '/auth/login';
  }

}
