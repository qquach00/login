export class Auth {
  password: string;
  password_confirm: string;


  constructor(password: string, password_confirm: string) {
    this.password = password;
    this.password_confirm = password_confirm;
  }
}
