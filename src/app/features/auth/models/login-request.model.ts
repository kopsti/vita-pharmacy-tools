export class LoginRequest {

  username: string;
  pass: string;

  constructor(username: string, pass: string) {
    this.username = username;
    this.pass = pass;
  }

}
