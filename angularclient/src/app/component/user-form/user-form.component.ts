import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as shajs from 'hash.js';

declare var angular: any;
declare var test: any;
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  response: any;
  authRequest:any;
  users: User[]=[];
  loginform: FormGroup;
  uname: string = "";
  check: boolean = true;
  passwd: string = "";
  str: String = "afsgdf";
  srcMainImg = 'assets/img/mainImg.jpg';
  show: any;
  user: User = new User("","","","","");
  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService) {

    this.loginform = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: new FormControl(false)
    });


  }

  onSubmit(){
    this.loginform.value.password = shajs.sha256().update( this.loginform.value.password).digest("hex");
    this.userService.rememberMe(this.loginform.value.rememberMe, this.loginform.value.username, this.loginform.value.password);

    if(this.userService.getCookies(this.loginform.value.username)){
      localStorage.getItem(this.loginform.value.username);
      localStorage.getItem(this.loginform.value.password);
      this.authRequest = JSON.parse(JSON.stringify({userName: this.loginform.value.username, passWord: this.loginform.value.password}));
      let resp=this.userService.generateToken(this.authRequest);
      resp.subscribe(data=>{
        this.userService.saveToken(data.toString());
        this.userService.getUser(this.loginform.value.username).subscribe(data => {
          this.userService.saveUser(data.uname);
          alert("Login success!");
          this.router.navigate(['/user']);
        });
      })
    }
    this.authRequest = JSON.parse(JSON.stringify({userName: this.loginform.value.username, passWord: this.loginform.value.password}));
    let resp=this.userService.generateToken(this.authRequest);
    resp.subscribe(data=> {
      if(data == "not"){
        alert("Invalid Credentials!");
        this.router.navigate(['']);
      }else{
        this.userService.saveToken(data.toString());
        this.userService.getUser(this.loginform.value.username).subscribe(data => {
          this.userService.saveUser(data.uname);
          alert("Login success!");
          this.router.navigate(['/user']);
        });
      }

    });
  }

  ngOnInit(): void {

  }
}
