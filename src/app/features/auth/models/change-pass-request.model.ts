export class ChangePassRequest {

  pass: string;
  updatedPass: string;

  constructor(pass: string, updatedPass: string) {
    this.pass = pass;
    this.updatedPass = updatedPass;
  }

}
