import { Injectable } from '@angular/core';
import { User } from '../model/user'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";

const token_key = "token-key";
const user_key = "user-key";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string = "http://localhost:8080";


  httpOptions: any;
  private currentUserSubject: BehaviorSubject<User> ;
  public currentUser: Observable<User> ;


  rememberMe(remember: boolean , username: string, password: string){
    if(remember){
      this.cookiesService.put(username, username);
      this.cookiesService.put(password, password);
    }
  }
  getCookies(username: string): boolean{
    if(localStorage.getItem(username) != null){
      return true;
    }
    return false;
  }


  token: string = "";
  username: string = "";
  constructor(private httpClient: HttpClient,
              private cookiesService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>({email: "", firstName: "", lastName: "", passwd: "", uname: ""});
    this.currentUser = new BehaviorSubject<User>({email: "", firstName: "", lastName: "", passwd: "", uname: ""});
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(token_key);
    window.sessionStorage.setItem(token_key, token);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(token_key);
  }

  public saveUser(username: string): void {
    window.sessionStorage.removeItem(user_key);
    window.sessionStorage.setItem(user_key, username);
  }

  public getUsername(): any {
    const uname = window.sessionStorage.getItem(user_key);
    if (uname) {
      return uname;
    }
    return "";
  }

  public generateToken(request:any){
    return this.httpClient.post<String>(this.usersUrl+"/user", request, {  responseType: 'text' as 'json'});
  }


  public authenticate(token: any) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return headers;
  }

  public getUser(username:String) {
    let headers = this.authenticate(this.getToken());
    return this.httpClient.get<User>("http://localhost:8080/getuser?username="+username, {headers, responseType: 'json' });
  }

  public findAll(): Observable<any> {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<User[]>(this.usersUrl + "/list", {headers, responseType: 'json' } );
  }

  public save(user: User) {
    return this.httpClient.post<User>(this.usersUrl+"/new", user);
  }

  public sendMail(mail: string) {
    return this.httpClient.get<string>("http://localhost:8080/sendemail?email="+mail);
  }

  public delete(username: string){
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.delete("http://localhost:8080/delete?uname="+username, {headers, responseType: 'json' });
  }

}
