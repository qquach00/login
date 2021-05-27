export class User {
  uname: string;
  passwd: string;
  firstName: string;
  lastName: string;
  email: string;


  constructor(uname: string, passwd: string, firstName: string, lastName: string, email: string) {
    this.uname = uname;
    this.passwd = passwd;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
